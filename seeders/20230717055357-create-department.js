"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "departments",
      [
        {
          id: 1,
          name: "HR",
          createdAt: "2023-06-23T03:16:10.260Z",
          updatedAt: "2023-06-23T03:16:10.260Z",
        },
        {
          id: 2,
          name: "PS",
          createdAt: "2023-06-23T03:18:58.245Z",
          updatedAt: "2023-06-23T03:18:58.245Z",
        },
        {
          id: 3,
          name: "ADMIN",
          createdAt: "2023-06-23T03:18:58.245Z",
          updatedAt: "2023-06-23T03:18:58.245Z",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("departments", null, {});
  },
};
