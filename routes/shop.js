const express = require("express");
const path = require("path");
const rootDir = require("../util/path");
const router = express.Router();
const shopControllers = require('../controllers/shop')

// const adminData = require('./admin')

router.get('/', shopControllers.getIndex);
router.get('/products', shopControllers.getProducts);
router.get('/cart', shopControllers.getCart);
router.get('/order', shopControllers.getOrder);
router.get('/checkout', shopControllers.getCheckout);

module.exports = router;
