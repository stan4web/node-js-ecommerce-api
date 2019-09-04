const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductCategoryController = require('../controllers/productCategory');


router.get("/", ProductCategoryController.productCategory_get_all);
router.post("/", ProductCategoryController.productCategory_create);
router.get("/:productCategoryId", ProductCategoryController.productCategory_get_details);
router.patch("/:productCategoryId", ProductCategoryController.productsCategory_update_category);
router.delete("/:productCategoryId", ProductCategoryController.productsCategory_delete);

module.exports = router;