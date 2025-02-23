import connection from "./index.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import Categories from "./categories.model.js";
import Users from "./users.model.js";
import Products from "./products.model.js";

//<------------------------------------------------------wishlists Table Model------------------------------------------------------>//

const Wishlist = connection.define(
  "Wishlist",
  {
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
  },
  {
    updatedAt: false,
  }
);

export default Wishlist;
