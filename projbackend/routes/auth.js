const express = require('express')
const router = express.Router()
const { check } = require('express-validator');
const {signout, signup, signin} = require('../controllers/auth')


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

module.exports = router