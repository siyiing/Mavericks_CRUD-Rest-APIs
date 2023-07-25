import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = (): Sequelize => {
    return new Sequelize({
        username: process.env.USER_NAME || 'postgres',
        password: process.env.PASS_WORD || 'siying',
        database: 'siying_db_production',
        host: 'siying_emp_api_db',
        dialect: 'postgres',
    });
};
