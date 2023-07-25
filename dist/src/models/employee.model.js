"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = exports.Department = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../services/sequelize");
var Department;
(function (Department) {
    Department["HR"] = "HR";
    Department["PS"] = "PS";
})(Department || (exports.Department = Department = {}));
;
const { Model } = require("sequelize");
class Employee extends Model {
    toJSON() {
        return Object.assign(Object.assign({}, this.get()), { uuid: undefined, createdAt: undefined, updatedAt: undefined });
    }
}
exports.Employee = Employee;
Employee.init({
    uuid: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
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
    salary: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    department: {
        type: sequelize_1.DataTypes.ENUM("HR", "PS"),
        allowNull: false
    },
}, {
    sequelize: (0, sequelize_2.sequelize)(),
    modelName: "Employee",
    tableName: "employees",
});
