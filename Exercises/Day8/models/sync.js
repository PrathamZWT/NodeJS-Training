import Carts from "../models/cart.model.js";
import Categories from "./categories.model.js";
import connection from "./index.js";
import Order_Items from "./order_items.model.js";
import Orders from "./orders.model.js";
import Products from "./products.model.js";
import Users from "./users.model.js";
import Wishlist from "./wishlist.model.js";

export const syncDatabase = async () => {
  try {
    Categories.hasMany(Products, {
      foreignKey: "category_id",
      onDelete: "CASCADE",
    });
    Products.belongsTo(Categories, {
      foreignKey: "category_id",
    });

    Users.hasOne(Carts, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
    Carts.belongsTo(Users, {
      foreignKey: "user_id",
    });
    ///////////////////////////////////////////////////
    Products.hasMany(Carts, {
      foreignKey: "product_id",
      onDelete: "CASCADE",
    });
    Carts.belongsTo(Products, {
      foreignKey: "product_id",
    });
    ///////////////////////////////////////////////////

    Users.hasOne(Wishlist, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
    Wishlist.belongsTo(Users, {
      foreignKey: "user_id",
    });

    ////////////////////////////////////////////////////////////
    Users.hasMany(Orders, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
    Orders.belongsTo(Users, {
      foreignKey: "user_id",
    });

    Products.hasMany(Order_Items, {
      foreignKey: "product_id",
      onDelete: "CASCADE",
    });
    Order_Items.belongsTo(Products, {
      foreignKey: "product_id",
    });

    Orders.hasMany(Order_Items, {
      foreignKey: "order_id",
      onDelete: "CASCADE",
    });
    Order_Items.belongsTo(Orders, {
      foreignKey: "order_id",
    });
    ////////////////////////////////////////////////////////////
    Products.hasMany(Wishlist, {
      foreignKey: "product_id",
      onDelete: "CASCADE",
    });
    Wishlist.belongsTo(Products, {
      foreignKey: "product_id",
    });
    await connection.sync({ alter: true });
    console.log("Database synced successfully!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};
