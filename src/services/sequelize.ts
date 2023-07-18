import { Sequelize } from 'sequelize';

export const sequelize = (): Sequelize => {
    
    return new Sequelize({
        username: "postgres",
        password: "siying",
        database: "sequelize_employee_db",
        host: "127.0.0.1",
        dialect: "postgres"
    });
};