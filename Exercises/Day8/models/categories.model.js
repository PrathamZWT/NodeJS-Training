import connection from "./index.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

//<------------------------------------------------------products Table Model------------------------------------------------------>//

const Categories = connection.define("Categories", {
  //Category name
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Categories;
