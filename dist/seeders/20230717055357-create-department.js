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
            yield queryInterface.bulkInsert("departments", [
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
            ], {});
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete("departments", null, {});
        });
    },
};
