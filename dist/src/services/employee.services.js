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
exports.deleteEmployeeByIdService = exports.updateEmployeeByIdService = exports.getEmployeeByIdService = exports.createEmployeeService = exports.getEmployeessByDepartmentIdService = exports.getAllEmployeeService = void 0;
const employee_model_1 = require("../models/employee.model");
// RETURN ALL EMPLOYEES
function getAllEmployeeService() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const emp = yield employee_model_1.Employee.findAll();
                return resolve(emp);
            }
            catch (e) {
                return reject(e);
            }
        }));
    });
}
exports.getAllEmployeeService = getAllEmployeeService;
// RETURN EMPLOYEES BY DEPARTMENT ID
function getEmployeessByDepartmentIdService(deptid) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let emp;
                let deptMap = new Map();
                deptMap.set(1, "HR");
                deptMap.set(2, "PS");
                console.log('hash map', deptMap);
                if (deptMap.has(+deptid)) {
                    const department = deptMap.get(+deptid);
                    emp = yield employee_model_1.Employee.findAll({ where: { department } });
                }
                else { // admin
                    emp = yield employee_model_1.Employee.findAll();
                }
                return resolve(emp);
            }
            catch (e) {
                return reject(e);
            }
        }));
    });
}
exports.getEmployeessByDepartmentIdService = getEmployeessByDepartmentIdService;
// CREATE NEW EMPLOYEE 
function createEmployeeService(name, salary, department) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let emp = { name: '', salary: 0, department: employee_model_1.Department.HR };
                const empobj = yield employee_model_1.Employee.findAll();
                try {
                    const existEmp = empobj.some((emp) => emp.name === name);
                    if (!existEmp) {
                        emp = yield employee_model_1.Employee.create({ name, salary, department });
                        return resolve(emp);
                    }
                    else {
                        return resolve(emp);
                    }
                }
                catch (e) {
                    return reject(e);
                }
            }
            catch (e) {
                return reject(e);
            }
        }));
    });
}
exports.createEmployeeService = createEmployeeService;
// GET EMPLOYEE BY ID
function getEmployeeByIdService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const emp = yield employee_model_1.Employee.findOne({ where: { id } });
                return resolve(emp);
            }
            catch (e) {
                return reject(e);
            }
        }));
    });
}
exports.getEmployeeByIdService = getEmployeeByIdService;
// UPDATE EMPLOYEE
function updateEmployeeByIdService(curEmp, inputEmp) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (curEmp.name == inputEmp.name && curEmp.salary == inputEmp.salary && curEmp.department == inputEmp.department) {
                    return resolve(304);
                    1;
                }
                else {
                    const emp = yield employee_model_1.Employee.update({
                        name: inputEmp.name,
                        salary: inputEmp.salary,
                        department: inputEmp.department,
                    }, {
                        where: { id: inputEmp.id }, returning: true,
                    });
                    return resolve(emp);
                }
            }
            catch (e) {
                return reject(e);
            }
        }));
    });
}
exports.updateEmployeeByIdService = updateEmployeeByIdService;
// DELETE EMPLOYEE 
function deleteEmployeeByIdService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const emp = yield employee_model_1.Employee.findOne({ where: { id } });
                if (!emp) // not exist 
                    return resolve(404);
                yield emp.destroy();
                return resolve(204);
            }
            catch (e) {
                return reject(e);
            }
        }));
    });
}
exports.deleteEmployeeByIdService = deleteEmployeeByIdService;
