"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = () => {
    return new sequelize_1.Sequelize({
        username: process.env.USER_NAME || 'postgres',
        password: process.env.PASS_WORD || 'siying',
        database: 'siying_db_production',
        host: 'siying_emp_api_db',
        dialect: 'postgres',
    });
};
exports.sequelize = sequelize;
