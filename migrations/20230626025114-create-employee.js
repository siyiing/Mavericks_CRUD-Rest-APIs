"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("employees", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      department: {
        type: DataTypes.ENUM(["HR", "PS"]),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("employees");
  },
};
