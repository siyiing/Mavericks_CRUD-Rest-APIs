"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.authenticateToken = exports.validateUser = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function validateUser(req, res, next) {
    const schema = joi_1.default.object({
        username: joi_1.default.string().required().min(2),
        password: joi_1.default.string().required(),
        departmentId: joi_1.default.number().required().valid(1, 2, 3) // so only have 1, 2 or 3 
    });
    // object exist but invalidate input 
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}
exports.validateUser = validateUser;
const authenticateToken = (req, res, next) => {
    const token = req.cookies["token"]; // req.body.token || req.query.token || 
    if (!token)
        return res.status(403).json({ message: "a token is required for authentication", requestState: 0 });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "invalid token", requestState: 0 });
    }
};
exports.authenticateToken = authenticateToken;
const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token)
        return res.status(403).json({ message: "a token is required for authentication", requestState: 0 });
    const bearer = token.split(' ');
    const bearerToken = bearer[1];
    console.log('be', bearerToken);
    try {
        const decoded = jsonwebtoken_1.default.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET);
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "invalid token", requestState: 0 });
    }
};
exports.auth = auth;
