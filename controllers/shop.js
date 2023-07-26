const Products = require("../models/products");
const Cart = require("../models/cart");

const getIndex = (req, res) => {
  Products.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        pageTitle: "Shop",
        path: "/",
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getProducts = (req, res) => {
  Products.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        pageTitle: "Products",
        path: "/products",
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
{
}

const getProduct = (req, res) => {
  const id = req.params.id;
  Products.findByPk(id)
  .then((product) => {
    res.render("shop/product-detail", {
      pageTitle: product.title,
      path: "detail",
      prod: product,
    })
  })
  .catch(err=>{
    console.log(err);
  })
};

const getCart = (req, res) => {
  Cart.getCart((cart) => {
    Products.fetchAll((products) => {
      const cartProducts = [];
      for (const product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        products: cartProducts,
      });
    });
  });
};
const postCart = (req, res) => {
  const id = req.body.id;
  Products.findById(id, (product) => {
    Cart.addProduct(id, product.price);
  });
  res.redirect("/cart");
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

const postDeleteCart = (req, res) => {
  const id = req.body.id;

  Products.findById(id, (product) => {
    Cart.deleteProduct(id, product.price);
    res.redirect("/");
  });
};

module.exports = {
  getIndex,
  getProducts,
  getCart,
  getCheckout,
  getOrder,
  getProduct,
  postCart,
  postDeleteCart,
};
