"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmployee = void 0;
const joi_1 = __importDefault(require("joi"));
function validateEmployee(employee) {
    const schema = joi_1.default.object({
        id: joi_1.default.number,
        name: joi_1.default.string().min(3).required(),
        salary: joi_1.default.number().required(),
        department: joi_1.default.string().valid('HR', 'PS').required()
    });
    return schema.validate(employee);
}
exports.validateEmployee = validateEmployee;
