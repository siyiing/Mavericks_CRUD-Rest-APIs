import { Express, Request, Response, NextFunction } from 'express';
import joi from 'joi';

function routes(app: Express) {

    const employee = [
        {id: 1, name: "ken", salary: 0, department: 'HR'},
        {id: 2, name: "ben", salary: 0, department: 'PS'}
    ];

    function validateEmployee(employee: any) {
        const schema = joi.object( {
            id: joi.number,
            name: joi.string().min(3).required(),
            salary: joi.number().required(),
            department: joi.string().valid('HR', 'PS').required()
        });
        return schema.validate(employee);
    }

    // BASE PATH 
    app.get('/', (req: Request, res: Response) => {
        res.send('Employee Operations');
    });

    // RETURN ALL THE EMPLOYEES
    // 500 
    app.get('/employee', (req: Request, res: Response) => {
        res.status(200).send(employee); 
        // throw new Error('wrong');
    });

    // CREATE A NEW EMPLOYEE 
    // 500
    app.post('/employee', (req: Request, res: Response) => {

        const { error } = validateEmployee(req.body); // error = result.error 

        if (error) 
            return res.status(400).send(error.details[0].message);

        const e = {
            id: employee.length + 1,
            name: req.body.name,
            salary: req.body.salary,
            department: req.body.department
        };

        employee.push(e);
        res.status(200).send(e);

    });

    // GET SPECIFIC EMPLOYEE BY ID
    // 500 
    app.get('/employee/:emp_id', (req: Request, res: Response) => {
        const emp = employee.find(c => c.id === parseInt(req.params.emp_id));
        if (!emp)
            return res.status(404).send('employee id not found');
        res.status(200).send(emp);
    });


    // UPDATE EMPLOYEE  
    // 304 500 
    app.put('/employee/:emp_id', (req: Request, res: Response) => {

        // find employee 
        const emp = employee.find(c => c.id === parseInt(req.params.emp_id));

        // not exist 
        if (!emp)
            return res.status(404).send('employee id not found');
        
        // exist, validate 
        const { error } = validateEmployee(req.body);

        // fail validation, bad request 
        if (error) 
            return res.status(400).send(error.details[0].message);
        
        // pass validation, update employee
        emp.name = req.body.name;
        emp.salary = req.body.salary;
        emp.department = req.body.department;

        // send updated employee 
        res.status(200).send(emp);
    });

    // DELETE EMPLOYEE 
    // 204 500
    app.delete('/employee/:emp_id', (req: Request, res: Response) => {

        // find employee 
        const emp = employee.find(c => c.id === parseInt(req.params.emp_id));

        // not exist 
        if (!emp)
            return res.status(404).send('employee id not found');
    
        // get index of employee to delete
        const index = employee.indexOf(emp);

        // use splice to remove object 
        employee.splice(index, 1); // 1 stands for remove 1 object which is index

        // return the same employee object  
        res.status(204).send(emp);
    });
}


export default routes;
