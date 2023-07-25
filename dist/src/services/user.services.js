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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUserService = exports.loginUserService = exports.createUserService = exports.getAllUserService = void 0;
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcrypt = require("bcryptjs"); // for password hashing
// RETURN ALL USER
function getAllUserService() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.User.findAll();
                return resolve(user);
            }
            catch (e) {
                return reject(e);
            }
        }));
    });
}
exports.getAllUserService = getAllUserService;
// CREATE NEW USER 
function createUserService(username, password, departmentId) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let user = { username: '', password: '', departmentId: 0 };
                const userobj = yield user_model_1.User.findAll();
                try {
                    const existUser = userobj.some(user => user.username === username);
                    if (!existUser) {
                        const hashedPW = yield bcrypt.hash(password, 12);
                        user = yield user_model_1.User.create({ username, password: hashedPW, departmentId });
                        return resolve(user);
                    }
                    else {
                        return resolve(user);
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
            catch (e) {
                return reject(e);
            }
        }));
    });
}
exports.createUserService = createUserService;
// GET USER BY ID // LOGIN
function loginUserService(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.User.findOne({ where: { username } });
                return resolve(user);
            }
            catch (e) {
                return reject(e);
            }
        }));
    });
}
exports.loginUserService = loginUserService;
function logoutUserService(token) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                    if (err)
                        return resolve(false);
                    else
                        return resolve(true);
                });
            }
            catch (e) {
                return reject(e);
            }
        }));
    });
}
exports.logoutUserService = logoutUserService;
