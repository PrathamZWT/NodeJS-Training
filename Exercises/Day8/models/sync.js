import Carts from "./cart.router.js";
import Categories from "./categories.model.js";
import connection from "./index.js";
import Products from "./products.model.js";
import Users from "./users.model.js";
import Wishlists from "./wishlist.model.js";

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
    Carts.belongsToMany(Users, {
      foreignKey: "user_id",
    });

    Users.hasOne(Wishlists, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
    Wishlists.belongsToMany(Users, {
      foreignKey: "user_id",
    });

    await connection.sync({ alter: true });
    console.log("Database synced successfully!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};
