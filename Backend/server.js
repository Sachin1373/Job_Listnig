import express from "express";
import dotenv from "dotenv";
import dbconnect from "./src/config/DataBaseConnection.js";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser"; 
import Auth from "./src/routes/Auth.js"
import Jobs from './src/routes/Jobs.js'

dotenv.config({
    path: './.env'
});

const port = process.env.PORT || 5000;
const app = express();


app.use(cors({
    origin: ['https://job-listnig-j4l1.vercel.app'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
})); 
app.use(morgan('dev')); 
app.use(helmet()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(function(err, req, res, next) {
    console.error(err); 
    res.status(500).json({ message: err.message }); 
  });


app.get('/api/v1', (req, res) => {
    console.log("Welcome to the backend");
    res.send("Welcome to the backend");
});


app.use('/api/v1/jobs',Jobs)
app.use('/api/v1/auth',Auth)


dbconnect();


app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
