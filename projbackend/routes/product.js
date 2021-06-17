const express = require('express')
const router = express.Router()

// controller imports
const {getProductById, createProduct, getProduct, photo, updateProduct, deleteProduct, getAllProducts, getAllUniqueCategories} = require('../controllers/product')
const {getUserById} = require('../controllers/user')
const {isAdmin, isAuthenticated, isSignedIn} = require('../controllers/auth')


// params
router.param("productId", getProductById)
router.param("userId", getUserById)

// routes
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct)
router.get("/product/:productId", getProduct)
router.get("/product/photo/:productId", photo)
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct)
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct)
router.get("/products", getAllProducts)
router.get("/products/categories", getAllUniqueCategories)

module.exports = router
