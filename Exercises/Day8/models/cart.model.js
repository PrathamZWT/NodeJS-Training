import connection from "./index.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import Categories from "./categories.model.js";
import Users from "./users.model.js";
import Products from "./products.model.js";

//<------------------------------------------------------products Table Model------------------------------------------------------>//

const Carts = connection.define("Carts", {
  // User who added the product
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
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
});

export default Carts;
