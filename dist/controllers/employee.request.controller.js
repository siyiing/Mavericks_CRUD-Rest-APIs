"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmployee = void 0;
const joi_1 = __importDefault(require("joi"));
const employee_model_1 = require("../the.models/employee.model");
function validateEmployee(req, res, next) {
    if (typeof (req.body.salary) != 'number')
        return res.status(400).send('salary must be number');
    const schema = joi_1.default.object({
        name: joi_1.default.string().required(),
        salary: joi_1.default.number().required(),
        department: joi_1.default.string().uppercase().valid(employee_model_1.Department.HR, employee_model_1.Department.PS).required()
    });
    // object exist but invalidate input 
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}
exports.validateEmployee = validateEmployee;
