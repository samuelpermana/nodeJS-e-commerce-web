const express = require("express");
const path = require("path");
const rootDir = require("../util/path");
const router = express.Router();
// const shopControllers = require('../controllers/shop')
const adminControllers = require('../controllers/admin')

// /admin/add-product => GET
router.get("/add-product", adminControllers.getAddProduct);
// /admin/add-product => POST
router.post('/add-product', adminControllers.postAddProduct);
// /admin/add-product => GET
router.get("/products",adminControllers.getProducts);
// /admin/editproduct
router.get("/edit-product/:productId",adminControllers.getEditProduct);

router.post('/edit-product', adminControllers.postEditProduct);

module.exports = {
  router,
};
