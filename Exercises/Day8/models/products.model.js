import connection from "./index.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import Categories from "./categories.model.js";

//<------------------------------------------------------products Table Model------------------------------------------------------>//

const Products = connection.define("Products", {
  //Product name
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Product description
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  //Product price
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  // Quantity in stock
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  // Product category
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Categories,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  // URL to product image
  image_url: {
    type: DataTypes.STRING,
  },
});

export default Products;
