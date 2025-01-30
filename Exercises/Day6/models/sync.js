import connection from "../config/connection.js";
import User from "./user.model.js";
import UserImages from "./user.images.model.js";
import UserProfiles from "./userProfile.model.js";

export const syncDatabase = async () => {
  try {
    User.hasMany(UserImages, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    UserImages.belongsTo(User, {
      foreignKey: "userId",
    });

    User.hasOne(UserProfiles, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    UserProfiles.belongsTo(User, {
      foreignKey: "userId",
    });

    await connection.sync({ alter: true });
    console.log("Database synced successfully!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};
