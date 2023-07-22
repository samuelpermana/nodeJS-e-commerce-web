const Products = require("../models/products");
const Cart = require("../models/cart")

const getIndex = (req, res) => {
  Products.fetchAll((products) => {
    res.render("shop/product-list", {
      pageTitle: "Shop",
      path: "/",
      prods: products,
    });
  });
};

const getProducts = (req, res) => {
  Products.fetchAll((products) => {
    res.render("shop/product-list", {
      pageTitle: "Products",
      path: "/products",
      prods: products,
    });
  });
};

const getProduct = (req, res) => {
  const productId = req.params.productId
  Products.findById(productId,(product)=>{
    res.render("shop/product-detail",{
      pageTitle:product.title,
      path:"detail",
      prod:product
    })
  })
  
  // });
};

const getCart = (req, res) => {
  res.render("shop/cart", {
    pageTitle: "Cart",
    path: "/cart",
    // prods: products,
  });
};
const postCart = (req, res) => {
  const productId = req.body.productId
  Products.findById(productId,(product)=>{
    Cart.addProduct(productId,product.price)
  });
  res.redirect('/cart');
};

const getCheckout = (req, res) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
    // prods: products,
  });
};
const getOrder = (req, res) => {
  res.render("shop/orders", {
    pageTitle: "Order",
    path: "/orders",
    // prods: products,
  });
};

module.exports = {
  getIndex,
  getProducts,
  getCart,
  getCheckout,
  getOrder,
  getProduct,
  postCart
};
