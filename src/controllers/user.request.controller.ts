import joi from 'joi';
import { Response, Request, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config()

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


export const authenticateToken: RequestHandler =  (req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies["token"]; // req.body.token || req.query.token || 
    console.log('THE TOKEN', token);
    if(!token) 
        return res.status(403).json({message: "a token is required for authentication", requestState: 0});
    
    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
        next();
    }catch(err){
        return res.status(401).json({message: "invalid token", requestState: 0}); 
    }
}


