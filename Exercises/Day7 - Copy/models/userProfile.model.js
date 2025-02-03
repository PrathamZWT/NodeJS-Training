import connection from "../config/config.js";
import { DataTypes } from "sequelize";
import User from "./user.model.js"; // ✅ Import User

const UserProfiles = connection.define(
  "UserProfiles",
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    bio: {
      type: DataTypes.STRING,
    },
    linkedInUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    facebookUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instaUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user_profiles",
  }
);

export default UserProfiles;
