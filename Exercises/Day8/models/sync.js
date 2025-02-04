import Categories from "./categories.model.js";
import connection from "./index.js";
import Products from "./products.model.js";

export const syncDatabase = async () => {
  try {
    Categories.hasMany(Products, {
      foreignKey: "category_id",
      onDelete: "CASCADE",
    });
    Products.belongsTo(Categories, {
      foreignKey: "category_id",
    });
    await connection.sync({ alter: true });
    console.log("Database synced successfully!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};
