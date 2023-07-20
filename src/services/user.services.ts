import { UserAttributes, User } from "../models/user.model";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

const bcrypt = require("bcryptjs"); // for password hashing



// RETURN ALL USER
export async function getAllUserService(): Promise<UserAttributes[]> {
    return new Promise (async (resolve, reject) => {
        try {
            const user = await User.findAll();
            return resolve(user);
        } catch (e) {
            return reject(e);
        }
    })
}

// CREATE NEW USER 
export async function createUserService(username: string, password: string, departmentId: number): Promise<UserAttributes> {
    return new Promise (async (resolve, reject) => {        
        try {
            let user: UserAttributes = {username: '', password: '', departmentId: 0};
            const userobj = await User.findAll();
            try {
                const existUser = userobj.some(user => user.username === username);
                if (!existUser) {
                    const hashedPW = await bcrypt.hash(password, 12);
                    user = await User.create({ username, password: hashedPW, departmentId });
                    return resolve(user);
                } else {
                    return resolve(user);
                }

            } catch (e) {
                console.log(e)
            }

            
        } catch (e) {
            return reject(e);   
        }
    })
}

// GET USER BY ID // LOGIN
export async function loginUserService(username: string): Promise<UserAttributes | null> {
    return new Promise (async (resolve, reject) => {
        try {
            const user  = await User.findOne({ where: { username }});

            return resolve(user);
        } catch (e) {
            return reject(e);   
        }
    })
}

export async function logoutUserService(token: string):  Promise<boolean> {
    return new Promise (async (resolve, reject) => {
        try {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, decoded) => {
                if (err)  return resolve(false);
                else return resolve(true);
                
              });

        } catch (e) {
            return reject(e);   
        }
    })
}