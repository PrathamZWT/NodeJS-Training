import connection from "./index.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import Categories from "./categories.model.js";
import Orders from "./orders.model.js";
import Products from "./products.model.js";

//<------------------------------------------------------products Table Model------------------------------------------------------>//

const Order_Items = connection.define("Order_Items", {
  // User who added the product
  order_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Orders,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  // Product added to wishlist
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Products,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Total order price
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

export default Order_Items;
