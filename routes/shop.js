const express = require("express");
const path = require("path");
const rootDir = require("../util/path");
const router = express.Router();
const prodsCtrl = require('../controllers/products')

const adminData = require('./admin')

router.get('/', prodsCtrl.getProducts);

module.exports = router;
