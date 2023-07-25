const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("ecommerceweb", "root", "mySql201.", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize