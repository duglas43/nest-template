"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("User", [
      {
        id: 1,
        email: "admin@mail.com",
        passwordHash:
          "$2b$05$m599jM38aIsCCqumbkUl2.6UQcetFz5QJxqj1k5Gi/4qPf9pTWsaq",
        refreshToken: null,
        firstName: "ADMIN",
        lastName: "ADMIN",
        patronymic: "ADMIN",
        language: "ru",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        email: "enginner@mail.com",
        passwordHash:
          "$2b$05$m599jM38aIsCCqumbkUl2.6UQcetFz5QJxqj1k5Gi/4qPf9pTWsaq",
        refreshToken: null,
        firstName: "ENGINEER",
        lastName: "ENGINEER",
        patronymic: "ENGINEER",
        language: "ru",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        email: "client@mail.com",
        passwordHash:
          "$2b$05$m599jM38aIsCCqumbkUl2.6UQcetFz5QJxqj1k5Gi/4qPf9pTWsaq",
        refreshToken: null,
        firstName: "CLIENT",
        lastName: "CLIENT",
        patronymic: "CLIENT",
        language: "ru",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        email: "hr@mail.com",
        passwordHash:
          "$2b$05$m599jM38aIsCCqumbkUl2.6UQcetFz5QJxqj1k5Gi/4qPf9pTWsaq",
        refreshToken: null,
        firstName: "HR",
        lastName: "HR",
        patronymic: "HR",
        language: "ru",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        email: "manager@mail.com",
        passwordHash:
          "$2b$05$m599jM38aIsCCqumbkUl2.6UQcetFz5QJxqj1k5Gi/4qPf9pTWsaq",
        refreshToken: null,
        firstName: "CLIENT_MANAGER",
        lastName: "CLIENT_MANAGER",
        patronymic: "CLIENT_MANAGER",
        language: "ru",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        email: "office-manager-1@mail.com",
        passwordHash:
          "$2b$05$pcWn7/4xoZKEtvtyBmIT5urH/B2NIb5sAZO3wyh6rAYfWM6Sfk4QO",
        refreshToken: null,
        firstName: "OFFICE_MANAGER_1",
        lastName: "OFFICE_MANAGER_1",
        patronymic: "OFFICE_MANAGER_1",
        language: "ru",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        email: "office-manager-2@mail.com",
        passwordHash:
          "$2b$05$f/ila0oPuW1ezJOVl8Jo1efvQoxM68U5qj67.0h78a0MtDt./Rc1y",
        refreshToken: null,
        firstName: "OFFICE_MANAGER_2",
        lastName: "OFFICE_MANAGER_2",
        patronymic: "OFFICE_MANAGER_2",
        language: "ru",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("User", null, {});
  },
};
