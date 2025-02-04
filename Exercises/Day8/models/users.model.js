import connection from "./index.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

//<------------------------------------------------------users Table Model------------------------------------------------------>//

const Users = connection.define("Users", {
  // User's first name
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // User's last name
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Email address
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  // Hashed password
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      if (value) {
        const hashedPassword = bcrypt.hashSync(value, 10);
        this.setDataValue("password", hashedPassword);
      }
    },
  },
  // Defines user role
  role: {
    type: DataTypes.ENUM("admin", "customer"),
    allowNull: false,
    defaultValue: "customer",
  },
});

export default Users;
