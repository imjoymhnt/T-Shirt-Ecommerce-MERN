const express = require('express')
const router = express.Router()
const { check } = require('express-validator');
const {signout, signup, signin, isSignedIn} = require('../controllers/auth')


router.post('/signup',[
    check('name', "Name should be atleast 3 char!").isLength({min: 3}),
    check("email", "Email is required!").isEmail(),
    check('password', "Password should be at least 5 char!").isLength({min: 5})
], signup)

router.post('/signin',[
    check("email", "Email is required!").isEmail(),
    check('password', "Password is required!").isLength({min: 1})
], signin)

router.get('/logout',signout)

// router.get('/testroute',  isSignedIn, (req, res) => {
//     res.send('Protected Route')
// } )

module.exports = router