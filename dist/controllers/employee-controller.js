"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployeeById = exports.updateEmployeeById = exports.getEmployeeById = exports.createEmployee = exports.getAllEmployee = exports.getBasePath = exports.validateEmployee = void 0;
const joi_1 = __importDefault(require("joi"));
const employee_model_1 = require("../models/employee-model");
// put in a collection 
const employee = [
    { id: 1, name: "ken", salary: 0, department: employee_model_1.Department.HR }
];
// move midderware Employee request controller 
// then route straigh call it 
// app.use (middleware)
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
// BASE PATH 
function getBasePath(req, res) {
    res.send('Employee Operations');
}
exports.getBasePath = getBasePath;
// RETURN ALL EMPLOYEES
function getAllEmployee(req, res) {
    // const emp = service.function();
    try {
        // send employee 
        res.status(200).send(employee);
    }
    catch (e) {
        throw new Error('500 server internal error');
    }
}
exports.getAllEmployee = getAllEmployee;
// CREATE NEW EMPLOYEE 
function createEmployee(req, res) {
    try {
        const { error } = validateEmployee(req.body); // error = result.error 
        if (error)
            return res.status(400).send(error.details[0].message);
        const e = {
            id: employee.length + 1,
            name: req.body.name,
            salary: req.body.salary,
            department: req.body.department
        };
        employee.push(e);
        res.status(200).send(e);
    }
    catch (e) {
        throw new Error('500 server internal error');
    }
}
exports.createEmployee = createEmployee;
// GET EMPLOYEE BY ID
function getEmployeeById(req, res) {
    try {
        const emp = employee.find(c => c.id === parseInt(req.params.emp_id));
        if (!emp)
            return res.status(404).send('employee id not found');
        res.status(200).send(emp);
    }
    catch (e) {
        throw new Error('500 server internal error');
    }
}
exports.getEmployeeById = getEmployeeById;
// UPDATE EMPLOYEE 
// 304 
function updateEmployeeById(req, res) {
    try {
        // find employee 
        const emp = employee.find(c => c.id === parseInt(req.params.emp_id));
        // not exist 
        if (!emp)
            return res.status(404).send('employee id not found');
        // exist, validate 
        const { error } = validateEmployee(req.body);
        // fail validation, bad request 
        if (error)
            return res.status(400).send(error.details[0].message);
        // pass validation, update employee
        emp.name = req.body.name;
        emp.salary = req.body.salary;
        emp.department = req.body.department;
        // send updated employee 
        res.status(200).send(emp);
    }
    catch (e) {
        throw new Error('500 server internal error');
    }
}
exports.updateEmployeeById = updateEmployeeById;
function deleteEmployeeById(req, res) {
    try {
        // find employee 
        const emp = employee.find(c => c.id === parseInt(req.params.emp_id));
        // not exist 
        if (!emp)
            return res.status(404).send('employee id not found');
        // get index of employee to delete
        const index = employee.indexOf(emp);
        // use splice to remove object 
        employee.splice(index, 1); // 1 stands for remove 1 object which is index
        // return the same employee object  
        res.status(204).send(emp);
    }
    catch (e) {
        throw new Error('500 server internal error');
    }
}
exports.deleteEmployeeById = deleteEmployeeById;
