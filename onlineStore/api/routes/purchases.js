const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const PurchaseController = require('../controllers/purchases');

// Handle incoming GET requests to /orders
router.get("/", checkAuth, PurchaseController.purchase_get_all);

router.post("/", checkAuth,  PurchaseController.purchase_create);

router.get("/:orderId", checkAuth,  PurchaseController.purchase_get_details);

router.delete("/:orderId", checkAuth,  PurchaseController.purchase_delete);

module.exports = router;
