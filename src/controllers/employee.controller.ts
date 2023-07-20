import { Request, Response } from 'express';
import * as Services from '../services/employee.services'
import { EmployeeI } from '../models/employee.model';

// BASE PATH 
export async function getBasePath(req: Request, res: Response) {
    res.json({message: "employee operations"});
}

// RETURN ALL EMPLOYEES
export async function getAllEmployee(req: Request, res: Response) {
    try {
        const emp = await Services.getAllEmployeeService();
        res.status(200).json(emp); 
   }
   catch (e) {
        res.status(500).json({errorMessage: e});
   }
}

// RETURN EMPLOYEE  BY DEPARTMENT ID
export async function getEmployeessByDepartmentId(req: Request, res: Response) {
    try {
        const user = await Services.getEmployeessByDepartmentIdService(req.params.departmentId);
        res.status(200).json(user); 
   }
   catch (e) {
        res.status(500).json({errorMessage: e});
   }
}



// CREATE NEW EMPLOYEE 
export async function createEmployee(req: Request, res: Response) {
    try {
        const emp = await Services.createEmployeeService(req.body.name, req.body.salary, req.body.department.toUpperCase()); 
        res.status(200).json(emp);
    }
    catch (e) {
        res.status(500).json({errorMessage: e});
    }
}


// GET EMPLOYEE BY ID
export async function getEmployeeById(req: Request, res: Response) {
    try {
        const emp = await Services.getEmployeeByIdService(req.params.emp_id);
        if (!emp)
            return res.status(404).send('employee id not found');
        res.status(200).json(emp);
    }
    catch (e) {
        res.status(500).json({errorMessage: e});
    }
}


// UPDATE EMPLOYEE
export async function updateEmployeeById(req: Request, res: Response) {
    try {
        const emp = await Services.getEmployeeByIdService(req.params.emp_id);
        // not exist 
        if (!emp)
            return res.status(404).json({errorMessage: 'employee id not found'});
        
        const inputEmp: EmployeeI = { id: +req.params.emp_id, name: req.body.name, salary: req.body.salary, department: req.body.department.toUpperCase() };
        const result = await Services.updateEmployeeByIdService(emp, inputEmp);

        if (typeof result === 'number' && result === 304) {
            res.statusMessage = 'no change';
            return res.sendStatus(304);
        }
        else 
            return res.status(200).json(result); // send updated employee 
    }
    catch (e) {
        res.status(500).json({errorMessage: e});
    }
}


export async function deleteEmployeeById(req: Request, res: Response) {
    try {
        const status = await Services.deleteEmployeeByIdService(req.params.emp_id);

        switch (status) {
            case 204:
                return res.sendStatus(204);
            case 404: 
                return res.status(404).send('employee id not found');
        }
    } catch (e) {
        res.status(500).json({errorMessage: e});
    }
}


