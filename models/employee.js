'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Employee extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        static associate(models) {
            // define association here
        }

        toJSON() {
            return {
                ...this.get(),
                uuid: undefined,
                createdAt: undefined,
                updatedAt: undefined,
            };
        }
    }

    Employee.init(
        {
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
                type: DataTypes.ENUM(['HR', 'PS']),
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
        },
        {
            sequelize,
            modelName: 'Employee',
            tableName: 'employees',
        }
    );
    return Employee;
};
