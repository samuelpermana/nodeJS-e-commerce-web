const path = require("path");
const fs = require("fs");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  // Fetching Addded Product
  static addProduct = (productId, productPrice) => {
    fs.readFile(p, (err,fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
        
    }
    // Checking exist or not
    const existingProductIndex = cart.products.findIndex(
      (prod) => prod.productId === productId
    );
    const existingProduct = cart.products[existingProductIndex]
    let updatedProduct
    // Push it on db
    if (existingProduct) {
        updatedProduct = {...existingProduct}
        updatedProduct.qty = updatedProduct.qty+1
        cart.products = [...cart.products]
        cart.products[existingProductIndex] = updatedProduct;
    }else{
        updatedProduct = {productId,qty:1}
        cart.products = [...cart.products, updatedProduct];
    }
    cart.totalPrice = cart.totalPrice + +productPrice;
    fs.writeFile(p,JSON.stringify(cart), (err)=>{
        console.log(err);
    })
    })
  }

  static deleteProduct(productId, productPrice){
    fs.readFile(p, (err,fileContent) => {
      if (err) {
        return
      }
      const cart = JSON.parse(fileContent)
      const updatedCart = {...cart}
      const product = updatedCart.products.find(
        (prod) => prod.productId === productId
      );
      const productQty = product.qty
      updatedCart.products = updatedCart.products.filter(prod => prod.productId !== productId)
      updatedCart.totalPrice = updatedCart.totalPrice - productQty * productPrice
      fs.writeFile(p,JSON.stringify(updatedCart), (err)=>{
        console.log(err);
    })
    })
  }
}
