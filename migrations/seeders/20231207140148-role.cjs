"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Role", [
      {
        id: 1,
        name: "ADMIN",
        description: "Administrator",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "ENGINEER",
        description: "ENGINEER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "CLIENT",
        description: "CLIENT",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "HR",
        description: "HR",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: "CLIENT_MANAGER",
        description: "CLIENT_MANAGER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: "OFFICE_MANAGER",
        description: "OFFICE_MANAGER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Role", null, {});
  },
};
