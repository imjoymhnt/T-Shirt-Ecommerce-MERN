const Product = require('../models/Product')

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if(err || !product) {
            return res.status(400).json({
                error: "No product found with this id"
            })
        }
        req.product = product
        next()
    })
}