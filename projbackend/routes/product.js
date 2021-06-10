const express = require('express')
const router = express.Router()

// controller imports
const {getProductById} = require('../controllers/product')
const {getUserById} = require('../controllers/user')
const {isAdmin, isAuthenticated, isSignedIn} = require('../controllers/auth')

// params
router.param("productId", getProductById)
router.param("userId", getUserById)


module.exports = router
