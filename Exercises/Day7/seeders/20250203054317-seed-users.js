"use strict";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const users = [];

    for (let i = 0; i < 100; i++) {
      const role = faker.helpers.arrayElement(["Admin", "User"]);
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync(faker.internet.password(), 10),
        age: faker.number.int({ min: 18, max: 70 }),
        role: role,
        isActive: faker.datatype.boolean(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
