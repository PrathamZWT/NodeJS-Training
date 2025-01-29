import { connection } from "./db_connections.js";
import path from "path";

//<------------------------------------------------------user-images Table funcrions------------------------------------------------------>//

// create user-images table
export const createrUserImages = async () => {
  try {
    const usersImageTable = await connection.query(
      ` CREATE TABLE user_images (
                id INT AUTO_INCREMENT PRIMARY KEY,
                userId INT NOT NULL,
                imageName VARCHAR(255) NOT NULL,
                path VARCHAR(255) NOT NULL,
                mimeType VARCHAR(50) NOT NULL,
                extension VARCHAR(10) NOT NULL,
                size BIGINT NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE)`
    );
    return usersImageTable;
  } catch (error) {
    console.log("Error occured in creating table ", error);
    return 0;
  }
};

// add image in user-images table
export const addUserImageDB = async (userID, file) => {
  // console.log(userID);
  // console.log(file);

  let imageName = file.filename;
  let filepath = file.path;
  let mimeType = file.mimetype;
  let extension = path.extname(imageName);
  let size = file.size;
  console.log(file);

  try {
    const userImageEntry = await connection.query(
      `
            INSERT INTO user_images
            ( userId, imageName, path, mimeType, extension, size )
            values (?,?,?,?,?,?)`,
      [userID, imageName, filepath, mimeType, extension, size]
    );
    return userImageEntry;
  } catch (error) {
    console.log("Error occured in adding new user in table ", error);
  }
};

// deletes images from user-images table
export const deleteImageDB = async (id) => {
  try {
    let deleted = await connection.query(
      `
                        DELETE FROM user_images WHERE userId = ?;
        `,
      [id]
    );
    return deleted;
  } catch (error) {
    console.log(error);
  }
};
