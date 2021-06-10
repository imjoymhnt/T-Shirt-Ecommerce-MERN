const User = require('../models/user')
const Order = require('../models/order')

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "User not found!"
            })
        }
        req.profile = user
        next()
    })
}

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    req.profile.__v = undefined;
    return res.json(req.profile)
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, user) => {
            if(err) {
                return res.status(400).json({
                    error: "Your are not authorized to update the user"
                })
            }
            user.salt = undefined
            user.encry_password = undefined
            res.json(user)
        }
    )
}

exports.userPurchaseList = (req, res) => {
    Order.find({user: req.profile._id})
    .populate("user", "_id name")
    .exec((err, order) => {
        if(err) {
            return res.status(400).json({
                error: "Np order found in this account!"
            })
        }
        return res.json(order)
    })
}

exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = []
    req.body.order.products.forEach(product => {
        const {_id, name, description, category, quantity} = product
        purchases.push({
            _id, name, description, category, quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
    });

    User.findOneAndUpdate(
        {_id: req.prodile._id},
        {$push: {purchases: purchases}},
        {new: true},
        (err, purchases) => {
            if(err) {
                return res.status(400).json({
                    error: "unable to save purchase list"
                })
            }
            next()
        }
    )

}