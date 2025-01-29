import { connection } from "./db_connections.js";
import path from "path";

//<------------------------------------------------------form Table funcrions------------------------------------------------------>//

// creates users table
export const createrFormTable = async () => {
  try {
    const usersTable = await connection.query(
      ` CREATE TABLE user_forms (
                  id integer PRIMARY KEY AUTO_INCREMENT ,
                  name TEXT NOT NULL,
                  email VARCHAR(255) NOT NULL,
                  age INT NOT NULL,
                  role TEXT NOT NULL,
                  pdfpath VARCHAR(255) NOT NULL,
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

export const addFormDB = async (name, email, age, role, isActive = 1, file) => {
  try {
    let pdfpath = file?.path ? String(file.path) : null;
    role = role[0].toUpperCase() + role.toLowerCase().substring(1);
    isActive = isActive ? true : false;
    age = parseInt(age, 10);

    const formEntry = await connection.query(
      `INSERT INTO user_forms (name, email, age, role, pdfpath, isActive) VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, age, role, pdfpath, isActive]
    );

    return formEntry;
  } catch (error) {
    console.log("Error occurred in adding new user in table", error);
  }
};
