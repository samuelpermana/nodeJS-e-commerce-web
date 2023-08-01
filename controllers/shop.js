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
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getCart = (req, res) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          res.render("shop/cart", {
            pageTitle: "Cart",
            path: "/cart",
            products: products,
          });
        })
        .catch((err) => console.log(err));
    })

    .catch((err) => console.log(err));
};

const postCart = (req, res) => {
  const productId = req.body.id;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      let newQty = 1;
      if (product) {
        const oldQty = product.cartItem.qty;
        newQty = oldQty + 1;
        return fetchedCart.addProduct(product, { through: { qty: newQty } });
      }
      return Products.findByPk(productId)
        .then((product) => {
          fetchedCart.addProduct(product, { through: { qty: newQty } });
        })
        .catch((err) => console.log(err));
    })
    .then(res.redirect("/cart"))
    .catch((err) => console.log(err));
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
  const productId = req.body.productId;
  console.log(productId)
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } })
    })
    .then(products=>{
      const product = products[0]
      return product.cartItem.destroy()
    })
    .then(result=>{
      res.redirect('/cart')
    })
    .catch(err=>console.log(err));
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
