const Category = require('../models/category')

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) => {
        if(err) {
            res.status(400).json({
                error: "No category found with this id"
            })
        }
        req.category = cate
    })

    next()
}

exports.createCategory = (req, res) => {
    const category = new Category(req.body)

    category.save((err, cate) => {
        if(err) {
            return res.status(400).json({
                error: "Can't save category to the DB"
            })
        }
        return res.json({cate})
    })
}

exports.getCategory = (req, res) => {
    return res.json(req.category)
}

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if(err) {
            return res.status(400).json({
                error: "Can't get all the categories"
            })
        }
        res.json({categories})
    })
}

exports.updateCategory = (req, res) => {
    const category = req.category
    category.name = req.body.name

    category.save((err, updatedCategory) => {
        if(err) {
            return res.status(400).json({
                error: "Can't update category"
            })
        }
        res.json({updatedCategory})
    })
}

exports.deleteCategory = (req, res) => {
    const category = req.category
    category.remove((err, category) => {
        if(err) {
            return res.status(400).json({
                error: "Can't delete thos category"
            })
        }
        res.json({message: `Successfully deleted ${category.name}`})
    })
}