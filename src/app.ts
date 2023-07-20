import express from 'express';
import routes from './routes';
import { sequelize } from "./services/sequelize";

const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const app = express();
// const cors = require('cors');

// middleware 
app.use(express.json());
// app.use(cors());
app.use(cookieParser())

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

routes(app);

const port = process.env.PORT || 3000;


app.listen(port, async() => { 
    await sequelize().authenticate(); 
    console.log("database connected");
});