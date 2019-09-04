const mongoose = require("mongoose");

const Cart = require("../models/cart");
const Product = require("../models/product");

exports.cart_get_all = (req, res, next) => {
  Cart.find()
    .select("product quantity _id costPrice")
    .populate("product", "name, sellPrice")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        
        shopping_cart: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            subtotal: doc.subtotal,
            request: {
              type: "GET",
              url: "http://localhost:3000/cart/" + doc._id
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

exports.cart_create = (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
      const cart = new Cart({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
        subtotal: product.sellPrice * req.body.quantity
      });
      return cart.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Added to cart",
        createdCart: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity,
          subtotal: result.subtotal
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/cart/" + result._id
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

exports.cart_get = (req, res, next) => {
  Cart.findById(req.params.orderId)
    .populate("product")
    .exec()
    .then(cart => {
      if (!cart) {
        return res.status(404).json({
          message: "Cart not found"
        });
      }
      res.status(200).json({
        cart: cart,
        request: {
          type: "GET",
          url: "http://localhost:3000/cart"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.cart_delete = (req, res, next) => {
  Cart.removeOne({ _id: req.params.cartId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Cart deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/cart",
          body: { CartId: "ID", productId: "ID" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
