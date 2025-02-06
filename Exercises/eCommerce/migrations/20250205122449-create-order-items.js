"use strict";
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("order_items", {
      // Unique order item ID
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // Associated order ID
      order_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Orders",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      // Purchased product ID
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      // Quantity purchased
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      //Price at the time of order
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      // Order item creation timestamp
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      // Last update timestamp
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("order_items");
  },
};
