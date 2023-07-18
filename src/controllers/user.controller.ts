import { Request, Response } from 'express';
import * as Services from '../services/user.services'

// RETURN ALL USER
export async function getAllUser(req: Request, res: Response) {
    try {
        const user = await Services.getAllUserService();
        res.status(200).json(user); 
   }
   catch (e) {
        res.status(500).json({errorMessage: e});
   }
}

// CREATE NEW USER 
export async function createUser(req: Request, res: Response) {
    try {
        const user = await Services.createUserService(req.body.username, req.body.password, req.body.departmentId ); 
        res.status(200).json(user);
    }
    catch (e) {
        res.status(500).json({errorMessage: e});
    }
}

// GET USER BY USERNAME
export async function getUserByUsername(req: Request, res: Response) {
    try {
        const user = await Services.getUserByUsernameService(req.params.username);
        if (!user)
            return res.status(404).send('user not found');
        res.status(200).json(user);
    }
    catch (e) {
        res.status(500).json({errorMessage: e});
    }
}
