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
Object.defineProperty(exports, "__esModule", { value: true });
const EmployeeController = __importStar(require("./controllers/employee.controller"));
const employee_request_controller_1 = require("./controllers/employee.request.controller");
const UserController = __importStar(require("./controllers/user.controller"));
const user_request_controller_1 = require("./controllers/user.request.controller");
function routes(app) {
    // BASE PATH 
    app.get('/', EmployeeController.getBasePath);
    // RETURN ALL THE EMPLOYEE
    app.get('/employee', user_request_controller_1.authenticateToken, EmployeeController.getAllEmployee);
    // CREATE A NEW EMPLOYEE 
    app.post('/employee', user_request_controller_1.authenticateToken, employee_request_controller_1.validateEmployee, EmployeeController.createEmployee);
    // GET EMPLOYEE BY ID
    app.get('/employee/:emp_id', user_request_controller_1.authenticateToken, EmployeeController.getEmployeeById);
    // UPDATE EMPLOYEE BY ID
    app.put('/employee/:emp_id', user_request_controller_1.authenticateToken, employee_request_controller_1.validateEmployee, EmployeeController.updateEmployeeById);
    // DELETE EMPLOYEE BY ID 
    app.delete('/employee/:emp_id', user_request_controller_1.authenticateToken, EmployeeController.deleteEmployeeById);
    // RETURN ALL THE USER
    app.get('/user', user_request_controller_1.authenticateToken, UserController.getAllUser);
    // CREATE A NEW USER // JWT 
    app.post('/user', user_request_controller_1.validateUser, UserController.createUser);
    // LOGIN // JWT 
    app.post('/userlogin', UserController.loginUser);
    // LOGOUT // JWT 
    app.post('/userlogout', UserController.logoutUser);
    // RETURN EMPLOYEES BY DEPARTMENT ID // NOT USING 
    app.get('/employees/:departmentId', user_request_controller_1.authenticateToken, EmployeeController.getEmployeessByDepartmentId);
    // AUTH 
    app.post('/userauth', user_request_controller_1.auth, UserController.getAuth);
}
exports.default = routes;
