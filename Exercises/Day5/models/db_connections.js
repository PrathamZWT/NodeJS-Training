import mysql from "mysql2";
import dotenv from 'dotenv'
import { createrUserImages, createrUserProfilesTable, createrUserTable } from "./user.model.js";
dotenv.config();

export let connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
}).promise();


export const checkDB = async () => {
    try {
        const check = await connection.query(`
            SELECT SCHEMA_NAME
            FROM INFORMATION_SCHEMA.SCHEMATA
            WHERE SCHEMA_NAME = 'day4DB'
        `);

        if (check[0].length > 0) {
            await connection.query("USE day4DB");
            console.log("Database connected");
        } else {
            
            await connection.query("CREATE DATABASE day4DB");
            console.log("Database created");

            connection = mysql.createPool({
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: 'day4DB',
            }).promise();
            console.log("Connected to day4DB");

            await createrUserTable();
            console.log("Users table created");
            
            await createrUserProfilesTable();
            console.log("User Profiles table created");

            await createrUserImages();
            console.log("hello");
            console.log("User Images table created");
            
        }
    } catch (error) {
        console.log("Error in checkDB:", error);
    }
};
