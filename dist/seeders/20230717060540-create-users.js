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
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkInsert("users", [
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
            ], {});
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete("users", null, {});
        });
    },
};