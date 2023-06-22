import { employee } from '../collections/employee.collection'
import { Employee, Department } from '../models/employee.model';

// RETURN ALL EMPLOYEES
export function getAllEmployeeService() {
    const empObj = employee; 
    return empObj;
}

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