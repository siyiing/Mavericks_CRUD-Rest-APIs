"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          username: "Apple",
          password: "apple",
          departmentId: 1,
          createdAt: "2023-06-23T03:16:10.260Z",
          updatedAt: "2023-06-23T03:16:10.260Z",
        },
        {
          id: 2,
          username: "Banana",
          password: "banana",
          departmentId: 2,
          createdAt: "2023-06-23T03:16:10.260Z",
          updatedAt: "2023-06-23T03:16:10.260Z",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
