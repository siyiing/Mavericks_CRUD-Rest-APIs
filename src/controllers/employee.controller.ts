import { Request, Response } from 'express';
import * as Services from '../services/employee.services'
import { Employee } from '../models/employee.model';

// BASE PATH 
export function getBasePath(req: Request, res: Response) {
    res.send('Employee Operations');
}

// RETURN ALL EMPLOYEES
export function getAllEmployee(req: Request, res: Response) {
    try {
        const emp = Services.getAllEmployeeService();
        res.status(200).send(emp); 
   }
   catch (e) {
    res.status(500).send('500 server internal error');
   }
}

// CREATE NEW EMPLOYEE 
export function createEmployee(req: Request, res: Response) {
    try {
        const emp = Services.createEmployeeService(req.body.name, req.body.salary, req.body.department.toUpperCase()); 
        res.status(200).send(emp);
    }
    catch (e) {
        res.status(500).send('500 server internal error');
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
// 304 
export function updateEmployeeById(req: Request, res: Response) {
    try {
        const emp = Services.getEmployeeByIdService(req.params.emp_id);
        
        // not exist 
        if (!emp)
            return res.status(404).send('employee id not found');
        

        const inputEmp: Employee = { id: +req.params.emp_id, name: req.body.name, salary: req.body.salary, department: req.body.department};
        const status = Services.updateEmployeeByIdService(emp, inputEmp);

        switch (status) {
            case 304:
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
