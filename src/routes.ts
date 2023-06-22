import { Express } from 'express';
import * as EmployeeController from './controllers/employee.controller';
import { validateEmployee } from './controllers/employee.request.controller';

function routes(app: Express) {

    // BASE PATH 
    app.get('/', EmployeeController.getBasePath);

    // RETURN ALL THE EMPLOYEE
    app.get('/employee', EmployeeController.getAllEmployee);

    // CREATE A NEW EMPLOYEE 
    app.post('/employee', validateEmployee, EmployeeController.createEmployee);

    // GET EMPLOYEE BY ID
    app.get('/employee/:emp_id', EmployeeController.getEmployeeById);

    // UPDATE EMPLOYEE BY ID
    app.put('/employee/:emp_id', validateEmployee, EmployeeController.updateEmployeeById);

    // DELETE EMPLOYEE BY ID 
    app.delete('/employee/:emp_id', EmployeeController.deleteEmployeeById);
}

export default routes;
