import connection from "./index.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import Categories from "./categories.model.js";
import Users from "./users.model.js";

//<------------------------------------------------------orders Table Model------------------------------------------------------>//

const Orders = connection.define("Orders", {
  // User who added the item
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  // Total order price
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  // Order status
  status: {
    type: DataTypes.ENUM("pending", "shipped", "delivered", "canceled"),
    defaultValue: "pending",
  },
});

export default Orders;
