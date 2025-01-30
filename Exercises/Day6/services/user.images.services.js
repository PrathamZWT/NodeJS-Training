import UserImages from "../models/user.images.model.js";
import * as pathone from "path";

export const addUserImageDB = async (userId, file) => {
  let imageName = file.filename;
  let path = file.path;
  let mimeType = file.mimetype;
  let extension = pathone.extname(imageName);
  let size = file.size;
  try {
    const userImageEntry = await UserImages.create({
      userId,
      imageName,
      path,
      mimeType,
      extension,
      size,
    });
    return userImageEntry;
  } catch (error) {
    console.log("Error occured in adding new user in table ", error);
  }
};

// deletes images from user-images table
export const deleteImageDB = async (userId) => {
  try {
    let deleted = await UserImages.destroy({ where: { userId } });
    return deleted;
  } catch (error) {
    console.log(error);
  }
};
