import connection from "./index.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import Categories from "./categories.model.js";
import Users from "./users.model.js";
import Products from "./products.model.js";

//<------------------------------------------------------products Table Model------------------------------------------------------>//

const Wishlists = connection.define("Wishlists", {
  // User who added the item
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  // Product added to cart
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Products,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  // Quantity of the product
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

export default Wishlists;
