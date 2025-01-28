import { connection } from "./db_connections.js";
import path from "path"

export const userExistsDB = async (id) => {
    console.log(id);

    const [rows] = await connection.query(
        `SELECT 1 FROM users WHERE id = ?;`,
        [id]
    );
    return rows.length > 0;
}
export const userProfileExistsDB = async (id) => {
    console.log(id);

    const [rows] = await connection.query(
        `SELECT 1 FROM user_profiles WHERE id = ?;`,
        [id]
    );
    return rows.length > 0;
}

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
        return usersTable
    } catch (error) {
        console.log("Error occured in creating table ", error);
        return 0;
    }
}

export const addUserDB = async (name, email, age, role, isActive) => {
    role = role[0].toUpperCase() + role.toLowerCase().substring(1);
    console.log(role);
    try {
        const userEntry = await connection.query(`
            INSERT INTO users
            (name,email,age,role,isActive)
            values (?,?,?,?,?)`
            , [name, email, age, role, isActive]);
        return userEntry;
    } catch (error) {
        console.log("Error occured in adding new user in table ", error);
    }
}
export const updateUserDB = async (body, id) => {
    try {
        if (Object.keys(body).length === 0) return null;
        let sql = `UPDATE users SET`;
        console.log(Object.entries(body));
        
        Object.entries(body).forEach(([key, value], index) => {
            const valueToSet = typeof body[key] === 'string' ? `'${value}'` : value;
            sql += ` ${key}=${valueToSet}` + ((Object.keys(body).length - 1 == index) ? `` : `, `);
        });
        // sql = sql.slice(0, -1); // Remove last ","
        sql += ` WHERE id=${id};`;
        const updateDetails = await connection.query(sql)
        return updateDetails;
    } catch (error) {
        console.log("Error occured in updating user in table ", error);
    }
}

export const getUsersDB = async (id) => {
    try {
        let users;
        console.log(id);
        
        if (id === undefined) {
            users = await connection.query(`
                SELECT *
                FROM
                users
                `)
                return users[0];
                
            }
            else {
                users = await connection.query(`
                    SELECT *
                    FROM
                    users
                    WHERE id = ? 
                    `, [id])
                    return users[0];
                }
            } catch (error) {
                console.log("Error occured in fetching user from table ", error);
            }
        }
        
        
export const deleteUserDB = async (id) => {
    try {
        let deleted = await connection.query(`
            DELETE FROM users WHERE id = ?;
            `, [id]);
            return deleted;
        } catch (error) {
            console.log(error);
            
        }
    }
    
    // user image
    
    
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
        }
        
        
        
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
                const userImageEntry = await connection.query(`
                    INSERT INTO user_images
                    ( userId, imageName, path, mimeType, extension, size )
                    values (?,?,?,?,?,?)`
                    , [userID, imageName, filepath, mimeType, extension, size]);
                    return userImageEntry;
                } catch (error) {
                    console.log("Error occured in adding new user in table ", error);
                }
        }
        
        export const createrUserProfilesTable = async() => {
            console.log("hello");
            
            try {
                const userProfileCreate =  await connection.query(`
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
                }
                
                export const addUserProfileDB = async (userId , bio, linkedInUrl , facebookUrl , instaUrl) => {
                    // console.log(role);
                    try {
                        const userEntry = await connection.query(`
                INSERT INTO user_profiles
                (userId , bio, linkedInUrl , facebookUrl , instaUrl)
                values (?,?,?,?,?)`
                , [userId , bio, linkedInUrl , facebookUrl , instaUrl]);
                return userEntry;
            } catch (error) {
                console.log("Error occured in adding new user in table ", error);
            }
        }
        export const getUsersProfileDB = async (id) => {
            try {
                let users;
            console.log(id);
            
            if (id === undefined) {
                users = await connection.query(`
                    SELECT *
                    FROM
                    user_profiles
                    `)
                    return users[0];
                    
                }
                else {
                    users = await connection.query(`
                        SELECT *
                        FROM
                        user_profiles
                        WHERE id = ? 
                        `, [id])
                        return users[0];
                    }
                } catch (error) {
                    console.log("Error occured in fetching user from table ", error);
                }
            }
            export const updateUserProfileDB = async (body, id) => {
                try {
                    if (Object.keys(body).length === 0) return null;
                    let sql = `UPDATE user_profiles SET`;
                    console.log(Object.entries(body));
                    
                    Object.entries(body).forEach(([key, value], index) => {
                        const valueToSet = typeof body[key] === 'string' ? `'${value}'` : value;
                        sql += ` ${key}=${valueToSet}` + ((Object.keys(body).length - 1 == index) ? `` : `, `);
                    });
                    // sql = sql.slice(0, -1); // Remove last ","
                    sql += ` WHERE userId=${id};`;
                    const updateDetails = await connection.query(sql)
                    return updateDetails;
                } catch (error) {
                    console.log("Error occured in updating user in table ", error);
                }
            }
            export const deleteUserProfileDB = async (id) => {
                try {
                    let deleted = await connection.query(`
                        DELETE FROM user_profiles WHERE id = ?;
                        `, [id]);
                        return deleted;
                    } catch (error) {
                        console.log(error);
                        
                    }
                }
            export const deleteImageDB = async (id) => {
                try {
                    let deleted = await connection.query(`
                        DELETE FROM user_profiles WHERE id = ?;
                        `, [id]);
                        return deleted;
                    } catch (error) {
                        console.log(error);
                        
                    }
                }