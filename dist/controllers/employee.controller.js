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
exports.getAllEmployee = exports.getBasePath = void 0;
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
            const emp = Services.getAllEmployeeService();
            res.status(200).json(emp);
        }
        catch (e) {
            res.status(500).json({ errorMessage: '500 server internal error' });
        }
    });
}
exports.getAllEmployee = getAllEmployee;
/*
// CREATE NEW EMPLOYEE
export function createEmployee(req: Request, res: Response) {
    try {
        const emp = Services.createEmployeeService(req.body.name, req.body.salary, req.body.department.toUpperCase());
        res.status(200).send(emp);
    }
    catch (e) {
        res.status(500).send({errorMessage: '500 server internal error'});
    }
}

// GET EMPLOYEE BY ID
export function getEmployeeById(req: Request, res: Response) {
    try {
        const emp = Services.getEmployeeByIdService(req.params.emp_id);
        if (!emp)
            return res.status(404).send('employee id not found');
        res.status(200).send(emp);
    }
    catch (e) {
        res.status(500).send('500 server internal error');
    }
}

// UPDATE EMPLOYEE
export function updateEmployeeById(req: Request, res: Response) {
    try {
        const emp = Services.getEmployeeByIdService(req.params.emp_id);
        
        // not exist
        if (!emp)
            return res.status(404).send('employee id not found');
        

        const inputEmp: EmployeeI = { id: +req.params.emp_id, name: req.body.name, salary: req.body.salary, department: req.body.department};
        const status = Services.updateEmployeeByIdService(emp, inputEmp);

        switch (status) {
            case 304:
                res.statusMessage = 'no change';
                return res.sendStatus(304);
            case emp:
                return res.status(200).send(emp); // send updated employee
        }
    }
    catch (e) {
        res.status(500).send('500 server internal error');
    }
}

export function deleteEmployeeById(req: Request, res: Response) {

    const status = Services.deleteEmployeeByIdService(req.params.emp_id);

    switch (status) {
        case 204:
            return res.status(204).send(status);
        case 404:
            return res.status(404).send('employee id not found');
        case 500:
            res.status(500).send('500 server internal error');
    }
}

*/
