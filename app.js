const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const rootDir = require("./util/path");
const app = express();

const adminData = require("./routes/admin");
const shopRoutes = require('./routes/shop')

const errorController = require('./controllers/error')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminData.router);
app.use("/", shopRoutes);

app.use("/", errorController);

app.listen(4000);
