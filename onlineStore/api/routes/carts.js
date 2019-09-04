const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const CartController = require('../controllers/cart');

// Handle incoming GET requests to /orders
router.get("/",CartController.cart_get_all);

router.post("/", CartController.cart_create);

router.get("/:cartId",  CartController.cart_get);

router.delete("/:cartId", CartController.cart_delete);

module.exports = router;