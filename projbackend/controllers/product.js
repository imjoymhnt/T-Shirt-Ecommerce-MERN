const Product = require("../models/Product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "No product found with this id",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image",
      });
    }

    // Restriction on product add
    const { name, description, price, category, stock } = fields;
    if (!name || !description || !price || !category || !stock) {
      res.status(400).json({
        error: "Please include all the fields!",
      });
    }

    let product = new Product(fields);

    // handle file
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Failed to save tshirt in the DB!",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  // req.product.photo = undefined
  return res.json(req.product);
};

exports.deleteProduct = (req, res) => {
  const product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      res.status(400).json({
        error: "Can't delete product",
      });
    }
    res.json({
      message: "Successfully deleted product from the DB",
    });
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image",
      });
    }

    let product = req.product;
    product = _.extend(product, fields);

    // handle file
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Failed to Update tshirt in the DB!",
        });
      }
      res.json(product);
    });
  });
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.params.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    // .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({ error: "No products Found!" });
      }
      res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      res.status(400).json({
        error: "No category found",
      });
    }
    res.json(category);
  });
};

// middleware
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, product) => {
    if (err) {
      res.status(400).json({
        error: "Bulk operation failed",
      });
    }
    next();
  });
};
