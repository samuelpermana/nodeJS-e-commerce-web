const Products = require("../models/products");

const getAddProduct = (req, res) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};
const postAddProduct = (req, res, next) => {
  const id = null;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Products(id, title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};

const getEditProduct = (req, res) => {
  const productId = req.params.productId;
  const edit = req.query.edit;
  if (!edit) {
    return res.redirect("/");
  }
  Products.findById(productId, (product) => {
    if (!product) {
      res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: edit,
      product,
    });
  });
};
const postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedtitle = req.body.title;
  const updatedimageUrl = req.body.imageUrl;
  const updatedprice = req.body.price;
  const updateddescription = req.body.description;
  const updatedProduct = new Products(
    productId,
    updatedtitle,
    updatedimageUrl,
    updatedprice,
    updateddescription
  );
  updatedProduct.save();
  res.redirect("/");
};

const getProducts = (req, res) => {
  Products.fetchAll((products) => {
    res.render("admin/products", {
      pageTitle: "Admin Products",
      path: "/admin/products",
      prods: products,
    });
  });
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
};
