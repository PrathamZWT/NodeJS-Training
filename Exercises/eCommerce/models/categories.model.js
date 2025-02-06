import connection from "./index.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

//<------------------------------------------------------categories Table Model------------------------------------------------------>//

const Categories = connection.define(
  "Categories",
  {
    //Category name
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["name"],
        name: "unique_name_index",
      },
    ],
  }
);

export default Categories;
