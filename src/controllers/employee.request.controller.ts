import joi from 'joi';
import { Department } from '../the.models/employee.model';
import { Response, Request, NextFunction } from 'express';


export function validateEmployee(req: Request, res: Response, next: NextFunction) {
    
    if (typeof(req.body.salary) != 'number')
        return res.status(400).send('salary must be number');

    const schema = joi.object( {
        name: joi.string().required(),
        salary: joi.number().required(),
        department: joi.string().uppercase().valid(Department.HR, Department.PS).required()
    });

    // object exist but invalidate input 
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
} 

