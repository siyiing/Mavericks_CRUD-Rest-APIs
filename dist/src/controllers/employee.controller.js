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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployeeById = exports.updateEmployeeById = exports.getEmployeeById = exports.createEmployee = exports.getAllEmployee = exports.getBasePath = void 0;
const Services = __importStar(require("../services/employee.services"));
// BASE PATH 
function getBasePath(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send('Employee Operations');
    });
}
exports.getBasePath = getBasePath;
// RETURN ALL EMPLOYEES
function getAllEmployee(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const emp = yield Services.getAllEmployeeService();
            res.status(200).json(emp);
        }
        catch (e) {
            res.status(500).json({ errorMessage: e });
        }
    });
}
exports.getAllEmployee = getAllEmployee;
// CREATE NEW EMPLOYEE 
function createEmployee(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const emp = yield Services.createEmployeeService(req.body.name, req.body.salary, req.body.department.toUpperCase());
            res.status(200).json(emp);
        }
        catch (e) {
            res.status(500).json({ errorMessage: e });
        }
    });
}
exports.createEmployee = createEmployee;
// GET EMPLOYEE BY ID
function getEmployeeById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const emp = yield Services.getEmployeeByIdService(req.params.emp_id);
            if (!emp)
                return res.status(404).send('employee id not found');
            res.status(200).json(emp);
        }
        catch (e) {
            res.status(500).json({ errorMessage: e });
        }
    });
}
exports.getEmployeeById = getEmployeeById;
// UPDATE EMPLOYEE
function updateEmployeeById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const emp = yield Services.getEmployeeByIdService(req.params.emp_id);
            // not exist 
            if (!emp)
                return res.status(404).json({ errorMessage: 'employee id not found' });
            const inputEmp = { id: +req.params.emp_id, name: req.body.name, salary: req.body.salary, department: req.body.department.toUpperCase() };
            const result = yield Services.updateEmployeeByIdService(emp, inputEmp);
            if (typeof result === 'number' && result === 304) {
                res.statusMessage = 'no change';
                return res.sendStatus(304);
            }
            else
                return res.status(200).json(result); // send updated employee 
        }
        catch (e) {
            res.status(500).json({ errorMessage: e });
        }
    });
}
exports.updateEmployeeById = updateEmployeeById;
function deleteEmployeeById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const status = yield Services.deleteEmployeeByIdService(req.params.emp_id);
            switch (status) {
                case 204:
                    return res.sendStatus(204);
                case 404:
                    return res.status(404).send('employee id not found');
            }
        }
        catch (e) {
            res.status(500).json({ errorMessage: e });
        }
    });
}
exports.deleteEmployeeById = deleteEmployeeById;
