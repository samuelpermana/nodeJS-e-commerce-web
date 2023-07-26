const Products = require("../models/products");

const getAddProduct = (req, res) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};
const postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    })
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

const getEditProduct = (req, res) => {
  const productId = req.params.productId;
  const edit = req.query.edit;
  if (!edit) {
    return res.redirect("/");
  }
  req.user.getProducts({where:{productId:productId}})
  // Products.findByPk(productId)
    .then((product) => {
      product = product[0]
      if (!product) {
        res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: edit,
        product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
const postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedtitle = req.body.title;
  const updatedimageUrl = req.body.imageUrl;
  const updatedprice = req.body.price;
  const updateddescription = req.body.description;
  Products.findByPk(productId)
    .then((product) => {
      product.title = updatedtitle;
      product.price = updatedprice;
      product.imageUrl = updatedimageUrl;
      product.description = updateddescription;
      return product.save();
    })
    .then((result) => {
      console.log("Updated Product!");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

const getProducts = (req, res) => {
  req.user.getProducts()
    .then((products) => {
      res.render("admin/products", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const postDeleteProduct = (req, res) => {
  const productId = req.body.productId;
  Products.findByPk(productId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("Deleted Product!");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};
