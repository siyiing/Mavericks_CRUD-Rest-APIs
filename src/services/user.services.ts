import { UserAttributes, User } from "../models/user.model";

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
            const user = await User.create({ username, password, departmentId });
            return resolve(user);
        } catch (e) {
            return reject(e);   
        }
    })
}

// GET USER BY ID
export async function getUserByUsernameService(username: string): Promise<UserAttributes | null> {
    return new Promise (async (resolve, reject) => {
        try {
            const user  = await User.findOne({ where: { username }});
            return resolve(user);
        } catch (e) {
            return reject(e);   
        }
    })
}