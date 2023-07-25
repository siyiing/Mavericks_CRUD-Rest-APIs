"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getAuth = exports.logoutUser = exports.loginUser = exports.createUser = exports.getAllUser = void 0;
const Services = __importStar(require("../services/user.services"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt = require("bcryptjs"); // for password hashing
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// RETURN ALL USER
function getAllUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield Services.getAllUserService();
            res.status(200).json(user);
        }
        catch (e) {
            res.status(500).json({ errorMessage: e });
        }
    });
}
exports.getAllUser = getAllUser;
// CREATE NEW USER // JWT 
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield Services.createUserService(req.body.username, req.body.password, req.body.departmentId);
            if (user.username !== '') {
                //  res.status(200).json(user); //send users details
                return res.sendStatus(200);
            }
            else {
                return res.sendStatus(400);
            }
        }
        catch (e) {
            res.status(500).json({ errorMessage: e });
        }
    });
}
exports.createUser = createUser;
// GET USER BY USERNAME // JWT 
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield Services.loginUserService(req.body.username);
            if (!user)
                return res.status(404).json({ message: 'user not found', requestState: 0 });
            if (user) {
                const isSame = yield bcrypt.compare(req.body.password, user.password); // hashed, plain
                if (isSame) {
                    const token = jsonwebtoken_1.default.sign({ username: user.username, departmentId: user.departmentId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 1 * 24 * 60 * 60 * 1000 });
                    res.cookie("token", token, { httpOnly: false });
                    // console.log('LOGIN USER', JSON.stringify(user, null, 2))
                    // console.log('LOGIN TOKEN', token);
                    // res.status(200).json(user); // send user data 
                    return res.status(200).json({ user, message: 'login successfully', token: token, requestState: 1 });
                }
                else {
                    return res.status(401).json({ message: 'password incorrect', requestState: 0 });
                }
            }
            else {
                return res.status(401).json({ message: 'authenication failed', requestState: 0 });
            }
        }
        catch (e) {
            res.status(500).json({ errorMessage: e });
            console.log(e);
        }
    });
}
exports.loginUser = loginUser;
function logoutUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.cookies["token"];
            // const blacklistedTokens = new Set();
            const result = yield Services.logoutUserService(token);
            if (result) {
                // blacklistedTokens.add(token);
                res.clearCookie('token');
                return res.status(200).json({ success: 1 });
            }
            else {
                return res.status(403).json({ success: 0 });
            }
        }
        catch (e) {
            res.status(500).json({ errorMessage: e });
            console.log('e');
        }
    });
}
exports.logoutUser = logoutUser;
function getAuth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json({ success: 1 });
        }
        catch (e) {
            res.status(500).json({ errorMessage: e });
            console.log('e');
        }
    });
}
exports.getAuth = getAuth;
