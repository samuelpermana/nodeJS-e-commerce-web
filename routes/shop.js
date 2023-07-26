const express = require("express");
const path = require("path");
const rootDir = require("../util/path");
const router = express.Router();
const shopControllers = require('../controllers/shop')

// const adminData = require('./admin')

router.get('/', shopControllers.getIndex);
router.get('/products', shopControllers.getProducts);
router.get('/products/:id', shopControllers.getProduct);
router.get('/cart', shopControllers.getCart);
router.post('/cart', shopControllers.postCart);
router.post('/cart-delete-item', shopControllers.postDeleteCart);
router.get('/orders', shopControllers.getOrder);
router.get('/checkout', shopControllers.getCheckout);

module.exports = router;
