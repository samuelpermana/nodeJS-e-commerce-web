const Products = require('../models/products')

const getAddProduct = (req, res) => {
    res.render('add-product',{
      pageTitle:'Add Product',
      path:'/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    })
  }

  const postAddProduct = (req, res, next) => {
    const product = new Products(req.body.title)
    product.save()
    res.redirect('/');
    }

    const getProducts = (req, res) => {
        const products = Products.fetchAll((products)=>{
            res.render('shop',{
              pageTitle:'Shop',
              path:'/',
              prods:products,
          
            })  
        })
        }

module.exports ={
    getAddProduct,
    postAddProduct,
    getProducts
}