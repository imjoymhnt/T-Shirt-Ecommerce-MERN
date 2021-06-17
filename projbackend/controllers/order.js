const {Order, ProductCart} = require('../models/order')

exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
        if(err) {
            res.status(400).json({
                error: "No order found in DB"
            })
        }
        req.product = product
        next()
    })
}

exports.createOrder = (req, res) => {
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    order.save((err, order) => {
        if(err) {
            return res.status(400).json({
                error: "Fail to save orde in the DB"
            })
        }
        res.json(order)
    })
}

exports.getAllOrders = (req, res) => {
    Order.find()
    .populate("user", "_id name")
    .exec((err, order) => {
        if(err) {
            return res.status(400).json({
                error: "No order found in the DB"
            })
        }
        res.json(order)
    })
}

exports.getOrderStatus = (req, res) => {
    res.json(Order.schema.path("status").enumValues);
}

exports.updateStatus = (req, res) => {
    Order.updateOne(
        {_id: req.body.orderId},
        {$set: { status: req.body.status}},
        (err, order) => {
            if(err) {
                return res.status(400).josn({
                    error: "Can't update order status"
                })
            }
            res.json(order)
        }
    )
}