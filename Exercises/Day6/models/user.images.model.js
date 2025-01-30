import connection from "../config/connection.js";
import { DataTypes } from "sequelize";
import User from "./user.model.js";
//<------------------------------------------------------user-images Table funcrions------------------------------------------------------>//

const UserImages = connection.define(
  "UserImages",
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    imageName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mimeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    extension: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    tableName: "user_images",
    updatedAt: false,
  }
);

export default UserImages;
