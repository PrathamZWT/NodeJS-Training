"use strict";
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      // Unique identifier for users
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // User's first name
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // User's last name
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // Email address
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      // Hashed password
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // Defines user role
      role: {
        type: Sequelize.ENUM("admin", "customer"),
        allowNull: false,
        defaultValue: "customer",
      },
      // Account creation timestamp
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      // Last update timestamp
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
