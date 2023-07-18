import joi from 'joi';
import { Response, Request, NextFunction } from 'express';

export function validateUser(req: Request, res: Response, next: NextFunction) {
    
    const schema = joi.object( {
        username: joi.string().required().min(2),
        password: joi.string().required(),
        departmentId: joi.number().required().valid(1, 2, 3) // so only have 1, 2 or 3 
    });

    // object exist but invalidate input 
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
} 

