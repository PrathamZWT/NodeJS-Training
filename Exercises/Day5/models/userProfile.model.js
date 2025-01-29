import { connection } from "./db_connections.js";
import path from "path";

//<------------------------------------------------------user-Profiles Table funcrions------------------------------------------------------>//

// creates user-profiles table
export const createrUserProfilesTable = async () => {
  console.log("hello");

  try {
    const userProfileCreate = await connection.query(`
                      CREATE TABLE user_profiles (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          userId INT NOT NULL,
                          bio TEXT,
                          linkedInUrl VARCHAR(255),
                          facebookUrl VARCHAR(255),
                          instaUrl VARCHAR(255),
                          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                          FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
                          );
                          `);
    return userProfileCreate;
  } catch (error) {
    console.log("Error occured in creating table ", error);
    return 0;
  }
};

// check if id exists in user-profiles table
export const userProfileExistsDB = async (id) => {
  console.log(id);

  const [rows] = await connection.query(
    `SELECT 1 FROM user_profiles WHERE id = ?;`,
    [id]
  );
  return rows.length > 0;
};

// check if userId exists in user-profiles table
export const userIdExistsDB = async (id) => {
  console.log(id);

  const [rows] = await connection.query(
    `SELECT 1 FROM user_profiles WHERE userId = ?;`,
    [id]
  );
  return rows.length > 0;
};

export const addUserProfileDB = async (
  userId,
  bio,
  linkedInUrl,
  facebookUrl,
  instaUrl
) => {
  // console.log(role);
  try {
    const userEntry = await connection.query(
      `
            INSERT INTO user_profiles
            (userId , bio, linkedInUrl , facebookUrl , instaUrl)
            values (?,?,?,?,?)`,
      [userId, bio, linkedInUrl, facebookUrl, instaUrl]
    );
    return userEntry;
  } catch (error) {
    console.log("Error occured in adding new user in table ", error);
  }
};
// gets user from user-profiles table
export const getUsersProfileDB = async (id) => {
  try {
    let users;
    console.log(id);

    if (id === undefined) {
      users = await connection.query(`
                  SELECT *
                  FROM
                  user_profiles
                  `);
      return users[0];
    } else {
      users = await connection.query(
        `
                      SELECT *
                      FROM
                      user_profiles
                      WHERE id = ? 
                      `,
        [id]
      );
      return users[0];
    }
  } catch (error) {
    console.log("Error occured in fetching user from table ", error);
  }
};
// updates user in user-profiles table
export const updateUserProfileDB = async (body, id) => {
  try {
    if (Object.keys(body).length === 0) return null;
    let sql = `UPDATE user_profiles SET`;
    console.log(Object.entries(body));

    Object.entries(body).forEach(([key, value], index) => {
      const valueToSet = typeof body[key] === "string" ? `'${value}'` : value;
      sql +=
        ` ${key} = ${valueToSet}` +
        (Object.keys(body).length - 1 == index ? `` : `, `);
    });
    // sql = sql.slice(0, -1); // Remove last ","
    sql += ` WHERE id = ${id}; `;
    const updateDetails = await connection.query(sql);

    return updateDetails, await getUsersProfileDB(id);
  } catch (error) {
    console.log("Error occured in updating user in table ", error);
  }
};
// delete user from user-profiles table
export const deleteUserProfileDB = async (id) => {
  try {
    let deleted = await connection.query(
      `
              DELETE FROM user_profiles WHERE id = ?;
          `,
      [id]
    );
    return deleted;
  } catch (error) {
    console.log(error);
  }
};
