import { Request, Response } from 'express';
import * as Services from '../services/user.services'
import jwt from 'jsonwebtoken';

const bcrypt = require("bcryptjs"); // for password hashing

import dotenv from 'dotenv';
dotenv.config()

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
// CREATE NEW USER // JWT 
export async function createUser(req: Request, res: Response) {
    try {
        const user = await Services.createUserService(req.body.username, req.body.password, req.body.departmentId ); 

        if (user.username !== '') {
            // let token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: 1 * 24 * 60 * 60 * 1000});
            // res.cookie("token", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

            // console.log("CREATE USER", JSON.stringify(user, null, 2));
            // console.log("TOKEN", token);

            //  res.status(200).json(user); //send users details
            return res.sendStatus(200);
        }
        else {
            return res.sendStatus(400);
        }
    }
    catch (e) {
        res.status(500).json({errorMessage: e});
    }
}

// GET USER BY USERNAME // JWT 
export async function loginUser(req: Request, res: Response) {
    try {
        const user = await Services.loginUserService(req.body.username);

        if (!user)
            return res.status(404).json({message: 'user not found', requestState: 0});

        if (user) {
            const isSame = await bcrypt.compare(req.body.password, user.password); // hashed, plain

            // if password is the same, generate token with the user's id and secretkey in the env file 
            if (isSame) {
                const token = jwt.sign({username: user.username}, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: 1*24*60*60*1000});
                // if password mathes with the one in database, generate a cookie for the user

                res.cookie("token", token, { httpOnly: true})
                console.log('LOGIN USER', JSON.stringify(user, null, 2))
                console.log('LOGIN TOKEN', token);

                // res.status(200).json(user); // send user data 
                return res.status(200).json({message: 'login successfully', token: token, requestState: 1})

            } 
            else {
                return res.status(401).json({message: 'password incorrect', requestState: 0});
            } 
        } 
        else {
            return res.status(401).json({message: 'authenication failed', requestState: 0});
        }
    }
    catch (e) {
        res.status(500).json({errorMessage: e});
        console.log(e)
    }
}



