import { connection } from "./db_connections.js";
import path from "path";

//<------------------------------------------------------users Table funcrions------------------------------------------------------>//

// check if id exists in users table
export const userExistsDB = async (id) => {
  console.log(id);

  const [rows] = await connection.query(`SELECT 1 FROM users WHERE id = ?;`, [
    id,
  ]);
  return rows.length > 0;
};

// creates users table
export const createrUserTable = async () => {
  try {
    const usersTable = await connection.query(
      ` CREATE TABLE users (
                id integer PRIMARY KEY AUTO_INCREMENT ,
                name TEXT NOT NULL,
                email VARCHAR(255) NOT NULL,
                age INT NOT NULL,
                role TEXT NOT NULL,
                isActive BOOL DEFAULT TRUE,
                createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
                updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW() )`
    );
    return usersTable;
  } catch (error) {
    console.log("Error occured in creating table ", error);
    return 0;
  }
};

// adds user to users table
export const addUserDB = async (name, email, age, role, isActive) => {
  role = role[0].toUpperCase() + role.toLowerCase().substring(1);
  console.log(role);
  try {
    const userEntry = await connection.query(
      `
                INSERT INTO users
                (name,email,age,role,isActive)
                values (?,?,?,?,?)`,
      [name, email, age, role, isActive]
    );
    return userEntry;
  } catch (error) {
    console.log("Error occured in adding new user in table ", error);
  }
};
// update user in users table
export const updateUserDB = async (body, id) => {
  try {
    if (Object.keys(body).length === 0) return null;
    let sql = `UPDATE users SET`;
    console.log(Object.entries(body));

    Object.entries(body).forEach(([key, value], index) => {
      const valueToSet = typeof body[key] === "string" ? `'${value}'` : value;
      sql +=
        ` ${key}=${valueToSet}` +
        (Object.keys(body).length - 1 == index ? `` : `, `);
    });
    // sql = sql.slice(0, -1); // Remove last ","
    sql += ` WHERE id=${id};`;
    const updateDetails = await connection.query(sql);
    return updateDetails;
  } catch (error) {
    console.log("Error occured in updating user in table ", error);
  }
};

// get user from users table
export const getUsersDB = async (id) => {
  try {
    const usersVar = await connection.query(
      `
        
            SELECT 
            users.*, 
            user_profiles.id AS profileId,
            user_profiles.userId AS profileUserId,
            user_profiles.bio,
            user_profiles.linkedInUrl,
                user_profiles.facebookUrl,
                user_profiles.instaUrl,
                user_profiles.createdAt AS usersProfileCreatedAt,
                user_profiles.updatedAt AS usersProfileUpdatedAt,
                user_images.id AS imageId,
                user_images.userId AS imageUserId,
                user_images.imageName,
                user_images.path,
                user_images.mimeType,
                user_images.extension,
                user_images.size,
                user_images.createdAt AS usersImageCreatedAt
                FROM users
                INNER YupN user_profiles ON users.id = user_profiles.userId
                INNER YupN user_images ON users.id = user_images.userId
                WHERE users.id = ?;
                
                `,
      [id]
    );
    return usersVar[0];
  } catch (error) {
    console.log("Error occured in fetching user from table ", error);
  }
};

// delete user from users table
export const deleteUserDB = async (id) => {
  try {
    let deleted = await connection.query(
      `
            DELETE FROM users WHERE id = ?;
            `,
      [id]
    );
    return deleted;
  } catch (error) {
    console.log(error);
  }
};
