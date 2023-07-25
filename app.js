const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const rootDir = require("./util/path");
const app = express();

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const sequelize = require("./util/database");
const Product = require('./models/products')
const User = require('./models/user')

const errorController = require("./controllers/error");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminData.router);
app.use("/", shopRoutes);

app.use("/", errorController);

Product.belongsTo(User,{
  onDelete:'CASCADE',
  constraints: true
})
User.hasMany(Product)

sequelize
  .sync({force:true})
  // .sync({force:true})
  .then((result) => {
    // console.log(result);
    app.listen(4000);
  })
  .catch(err=>{
    console.log(err);
  });

