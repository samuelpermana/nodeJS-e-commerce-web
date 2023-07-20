const express = require("express");
const path = require("path");
const rootDir = require("../util/path");
const router = express.Router();
const productCtrl = require('../controllers/products')

router.get("/add-product", productCtrl.getAddProduct);
// /admin/add-product => POST
router.post('/add-product', productCtrl.postAddProduct);

module.exports = {
  router,
  
};
