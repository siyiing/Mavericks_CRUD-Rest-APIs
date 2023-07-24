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

            if (isSame) {
                const token = jwt.sign({username: user.username, departmentId: user.departmentId}, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: 1*24*60*60*1000});

                res.cookie("token", token, { httpOnly: false})
                // console.log('LOGIN USER', JSON.stringify(user, null, 2))
                // console.log('LOGIN TOKEN', token);

                // res.status(200).json(user); // send user data 
                return res.status(200).json({user, message: 'login successfully', token: token, requestState: 1})
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

export async function logoutUser(req: Request, res: Response) {
    try {
        const token = req.cookies["token"];
        // const blacklistedTokens = new Set();
        const result = await Services.logoutUserService(token);
        if (result) {
            // blacklistedTokens.add(token);
            res.clearCookie('token');
            return res.status(200).json({success: 1});
        }
        else {return res.status(403).json({success: 0});}
    } catch (e) {
        res.status(500).json({errorMessage: e});
        console.log('e')
    }
}

export async function getAuth(req: Request, res: Response) {
    try {
        return res.status(200).json({success: 1});
        
    } catch (e) {
        res.status(500).json({errorMessage: e});
        console.log('e')
    }
}

