import express from 'express';
import routes from './routes';
import { sequelize } from "./services/sequelize";

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

routes(app);

const port = process.env.PORT || 3000;


app.listen(port, async() => { 
    await sequelize().authenticate(); // dont create table ust connect
    console.log("database connected");
});