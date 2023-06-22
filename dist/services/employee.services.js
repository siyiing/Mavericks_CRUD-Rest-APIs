"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployeeByIdService = exports.updateEmployeeByIdService = exports.getEmployeeByIdService = exports.createEmployeeService = exports.getAllEmployeeService = void 0;
const employee_collection_1 = require("../collections/employee.collection");
// RETURN ALL EMPLOYEES
function getAllEmployeeService() {
    const empObj = employee_collection_1.employee;
    return empObj;
}
exports.getAllEmployeeService = getAllEmployeeService;
// CREATE NEW EMPLOYEE 
function createEmployeeService(name, salary, department) {
    const emp = {
        id: employee_collection_1.employee.length + 1,
        name: name,
        salary: salary,
        department: department
    };
    employee_collection_1.employee.push(emp);
    return emp;
}
exports.createEmployeeService = createEmployeeService;
// GET EMPLOYEE BY ID
function getEmployeeByIdService(id) {
    const emp = employee_collection_1.employee.find(c => c.id === parseInt(id)); // find employee
    return emp;
}
exports.getEmployeeByIdService = getEmployeeByIdService;
// UPDATE EMPLOYEE
function updateEmployeeByIdService(emp, inputEmp) {
    // pass validation, check if changed 
    if (emp.name == inputEmp.name && emp.salary == inputEmp.salary && emp.department == inputEmp.department) {
        return 304;
    }
    else {
        emp.name = inputEmp.name;
        emp.salary = inputEmp.salary;
        emp.department = inputEmp.department;
        return emp;
    }
}
exports.updateEmployeeByIdService = updateEmployeeByIdService;
// DELETE EMPLOYEE 
function deleteEmployeeByIdService(id) {
    try {
        const emp = employee_collection_1.employee.find(c => c.id === parseInt(id)); // find employee 
        if (!emp) // not exist 
            return 404;
        const index = employee_collection_1.employee.indexOf(emp); // get index of employee to delete
        // use splice to remove object 
        employee_collection_1.employee.splice(index, 1); // 1 stands for remove 1 object which is inde
        return 204;
    }
    catch (e) {
        return 500;
    }
}
exports.deleteEmployeeByIdService = deleteEmployeeByIdService;
