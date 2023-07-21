const Products = require('../models/products')

const getAddProduct = (req, res) => {
    res.render('admin/add-product',{
      pageTitle:'Add Product',
      path:'/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    })
  }

  const getProducts = (req, res) => {
    Products.fetchAll((products) => {
      res.render("admin/products", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        prods: products,
      });
    });
  };
  
  const postAddProduct = (req, res, next) => {
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    const product = new Products(title, imageUrl, price, description)
    product.save()
    res.redirect('/');
    }
  
    module.exports ={
        getAddProduct,
        postAddProduct,
        getProducts
      
    }