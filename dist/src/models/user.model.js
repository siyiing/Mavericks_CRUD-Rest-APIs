"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../services/sequelize");
class User extends sequelize_1.Model {
    static associate(models) {
        User.belongsTo(models.departments, { foreignKey: 'departmentId' });
    }
}
exports.User = User;
;
User.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    departmentId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize: (0, sequelize_2.sequelize)(),
    modelName: 'User',
    tableName: "users",
});
