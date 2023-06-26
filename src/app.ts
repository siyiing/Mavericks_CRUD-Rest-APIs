import express from 'express';
import routes from './routes';

const { sequelize } = require("../models/");
const app = express();

app.use(express.json());

routes(app);

const port = process.env.PORT || 3000;

app.listen(port, async() => { 
    await sequelize.authenticate(); // dont create table ust connect
    console.log("database connected");
});