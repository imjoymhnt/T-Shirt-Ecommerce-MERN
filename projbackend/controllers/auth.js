const User = require('../models/user')
const { validationResult, cookie } = require('express-validator');
const user = require('../models/user');
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')


exports.signup = (req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param
        })
    }

    const user = new User(req.body)
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                err: "Not able to save user in the DB"
            })
        }
        return res.json({
            name: user.name,
            email: user.email,
            id: user._id
        })
    })
}

exports.signin = (req, res) => {
    const {email, password} = req.body

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param
        })
    }

    User.findOne({email}, (err, user) => {
        if(err || !user) {
           return res.status(400).json({
                error: "Email is not valid!"
            })
        }
        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password don't match!"
            })
        }

        // create token
        const token = jwt.sign({_id: user._id}, process.env.SECRET)
        
        // put token to cookie
        res.cookie("token", token, {expire: new Date() + 1})

        // send response to frontend
        const {_id, name, email, role} = user
        res.json({token, user: {_id, role, email, name}})
    })
}


exports.signout = (req, res) => {
    res.send("Logout page")
}