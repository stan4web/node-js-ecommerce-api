const mongoose = require("mongoose");

const Order = require("../models/order");
const Product = require("../models/product");
const ProductCategory = require('../models/productCategory');


// List
exports.productCategory_get_all = (req, res, next) => {
    ProductCategory.find()
    .select("name _id")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        data: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            request: {
              type: "GET",
              url: "http://localhost:3000/productsCategory/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};


// Create
exports.productCategory_create = (req, res, next) => {
    const category = new ProductCategory({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
      });
      category
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "Category Created successfuly",
            createdCategory: {
              name: result.name,
              _id: result._id,
              request: {
                type: "GET",
                url: "http://localhost:3000/productsCategory/" + result._id
              }
            }
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
  };


  // Datails:{id}
  exports.productCategory_get_details = (req, res, next) => {
    const id = req.params.productCategoryId
    ProductCategory.findById(id)
      .select("name _id")
      .exec()
      .then(doc => {
        if (doc) {
          res.status(200).json({
            category: doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/productsCategory"
            }
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  };



  // Update {id}
  exports.productsCategory_update_category = (req, res, next) => {
    const id = req.params.productCategoryId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    ProductCategory.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Category updated",
          request: {
            type: "GET",
            url: "http://localhost:3000/productsCategory/" + id
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };



  // Delete {id}
  exports.productsCategory_delete = (req, res, next) => {
    const id = req.params.productCategoryId;
    ProductCategory.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Product deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/productsCategory",
            body: { name: "String" }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
  