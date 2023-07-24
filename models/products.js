const path = require("path");
const fs = require("fs");
const Cart = require("./cart")

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(productId, title, imageUrl, price, description) {
    this.productId = productId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
  save() {
    getProductFromFile((products) => {
      if (this.productId) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.productId === this.productId
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.productId = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(productId) {
    getProductFromFile((products) => {
      const product = products.find(prod => prod.productId === productId)
      const updatedProducts = products.filter(
        (prod) => prod.productId !== productId
      );
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(productId, product.price)
        }
      });
    });
  }

  static fetchAll(cb) {
    getProductFromFile(cb);
  }

  static findById(id, cb) {
    getProductFromFile((products) => {
      const product = products.find((p) => p.productId === id);
      cb(product);
    });
  }
};
