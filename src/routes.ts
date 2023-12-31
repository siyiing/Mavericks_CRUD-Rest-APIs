import { Express } from 'express';
import * as EmployeeController from './controllers/employee.controller';
import { validateEmployee } from './controllers/employee.request.controller';
import * as UserController from './controllers/user.controller';
import { authenticateToken, validateUser, auth } from './controllers/user.request.controller';

function routes(app: Express) {

    // BASE PATH 
    app.get('/', EmployeeController.getBasePath);

    // RETURN ALL THE EMPLOYEE
    app.get('/employee', authenticateToken, EmployeeController.getAllEmployee);

    // CREATE A NEW EMPLOYEE 
    app.post('/employee', authenticateToken, validateEmployee, EmployeeController.createEmployee);

    // GET EMPLOYEE BY ID
    app.get('/employee/:emp_id', authenticateToken, EmployeeController.getEmployeeById);

    // UPDATE EMPLOYEE BY ID
    app.put('/employee/:emp_id', authenticateToken, validateEmployee, EmployeeController.updateEmployeeById);

    // DELETE EMPLOYEE BY ID 
    app.delete('/employee/:emp_id', authenticateToken, EmployeeController.deleteEmployeeById);

    // RETURN ALL THE USER
    app.get('/user', authenticateToken, UserController.getAllUser);

    // CREATE A NEW USER // JWT 
    app.post('/user', validateUser, UserController.createUser);

    // LOGIN // JWT 
    app.post('/userlogin', UserController.loginUser); 

    // LOGOUT // JWT 
    app.post('/userlogout', UserController.logoutUser); 

    // RETURN EMPLOYEES BY DEPARTMENT ID // NOT USING 
    app.get('/employees/:departmentId', authenticateToken, EmployeeController.getEmployeessByDepartmentId);

    // AUTH 
    app.post('/userauth', auth, UserController.getAuth); 

}

export default routes;
