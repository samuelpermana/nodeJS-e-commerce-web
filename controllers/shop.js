const Products = require("../models/products");

const getIndex = (req, res) => {
  Products.fetchAll((products) => {
    res.render("shop/products-list", {
      pageTitle: "Shop",
      path: "/",
      prods: products,
    });
  });
};

const getProducts = (req, res) => {
  Products.fetchAll((products) => {
    res.render("shop/products-list", {
      pageTitle: "Products",
      path: "/products",
      prods: products,
    });
  });
};

const getCart = (req, res) => {
  res.render("shop/cart", {
    pageTitle: "Cart",
    path: "/cart",
    // prods: products,
  });
};
const getCheckout = (req, res) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
    // prods: products,
  });
};
const getOrder = (req, res) => {
  res.render("shop/order", {
    pageTitle: "Order",
    path: "/order",
    // prods: products,
  });
};

module.exports = {
  getIndex,
  getProducts,
  getCart,
  getCheckout,
  getOrder
};
