"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, DataTypes) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.createTable("departments", {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: DataTypes.INTEGER,
                },
                name: {
                    type: DataTypes.STRING,
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
        });
    },
    down(queryInterface, DataTypes) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable("departments");
        });
    },
};
