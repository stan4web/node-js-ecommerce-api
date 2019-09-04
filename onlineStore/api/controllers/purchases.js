const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Purchase = require("../models/purchase");
const Product = require("../models/product");
const Inventory = require("../models/inventory");

exports.purchase_get_all = (req, res, next) => {
  Purchase.find()
    .select("product quantity _id orderDate")
    .populate("product", "name")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        purchase: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            purchaseDate: doc.purchaseDate,
            request: {
              type: "GET",
              url: "http://localhost:3000/purchase/" + doc._id
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

exports.purchase_create = (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
      const purchase = new Purchase({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
        orderDate: req.body.orderDate
      });

      Inventory.findOne({product: req.body.productId})
        .then(result =>{
          if(!result){
            //create document if not exist in inventory collection
            const postInventory = new Inventory({
              _id: mongoose.Types.ObjectId(),
              quantity: req.body.quantity,
              product: req.body.productId,
              purchase: purchase._id,
              purchaseDate: req.body.purchaseDate
            });
            return postInventory.save();
          }
          if(result){
            //update one document in inventory collection
            return Inventory.updateOne({_id: result._id},{$set:{quantity: result.quantity + req.body.quantity}});
          }
        })
      return purchase.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "purchase stored",
        createdPurchase: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity,
          orderDate: result.orderDate
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/purchase/" + result._id
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

exports.purchase_get_details = (req, res, next) => {
  Purchase.findById(req.params.orderId)
    .populate("product")
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/purchase"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.purchase_delete = (req, res, next) => {
  Purchase.remove({ _id: req.params.productId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/purchase",
          body: { productId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};


