const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const OrderItem = sequelize.define('orderItem',{
  id:{
    type:Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  qty:Sequelize.INTEGER,
  
})

module.exports = OrderItem
