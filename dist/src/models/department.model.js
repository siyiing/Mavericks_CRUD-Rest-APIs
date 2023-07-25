"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../services/sequelize");
class Department extends sequelize_1.Model {
    static associate(models) {
        Department.hasMany(models.users, { foreignKey: 'userId' });
    }
}
exports.default = Department;
Department.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: (0, sequelize_2.sequelize)(),
    modelName: "Department",
    tableName: "departments",
});
