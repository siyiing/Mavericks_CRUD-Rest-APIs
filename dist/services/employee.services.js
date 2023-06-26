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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEmployeeService = void 0;
// import { employee } from '../collections/employee.collection'
// import { Employee, Department } from '../the.models/employee.model';
const { Employee } = require("../../models/");
// RETURN ALL EMPLOYEES
function getAllEmployeeService() {
    return __awaiter(this, void 0, void 0, function* () {
        const emp = yield Employee.findAll();
        return emp;
    });
}
exports.getAllEmployeeService = getAllEmployeeService;
/*
// CREATE NEW EMPLOYEE
export function createEmployeeService(name: string, salary: number, department: Department) {
    
    const emp = {
        id: employee.length + 1,
        name: name,
        salary: salary,
        department: department
    };
    employee.push(emp);
    return emp;
}

// GET EMPLOYEE BY ID
export function getEmployeeByIdService(id: string) {
    const emp = employee.find(c => c.id === parseInt(id)); // find employee
    return emp;
}

// UPDATE EMPLOYEE
export function updateEmployeeByIdService(emp: Employee, inputEmp: Employee) {
    // pass validation, check if changed
    if (emp.name == inputEmp.name && emp.salary == inputEmp.salary && emp.department == inputEmp.department) {
        return 304;
    }
    else  {
        emp.name = inputEmp.name;
        emp.salary = inputEmp.salary;
        emp.department = inputEmp.department;
        return emp;
    }
}

// DELETE EMPLOYEE
export function deleteEmployeeByIdService(id: string) {

    try {
        const emp = employee.find(c => c.id === parseInt(id)); // find employee

        if (!emp)  // not exist
            return 404;

        const index = employee.indexOf(emp); // get index of employee to delete

        // use splice to remove object
        employee.splice(index, 1); // 1 stands for remove 1 object which is inde

        return 204;
    }
    catch (e) {
        return 500;
    }
}

*/ 
