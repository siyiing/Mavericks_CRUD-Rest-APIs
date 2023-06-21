import joi from 'joi';
import { Employee } from '../models/employee-model';

export function validateEmployee(employee: Employee) {
    const schema = joi.object( {
        id: joi.number,
        name: joi.string().min(3).required(),
        salary: joi.number().required(),
        department: joi.string().valid('HR', 'PS').required()
    });
    return schema.validate(employee);
}