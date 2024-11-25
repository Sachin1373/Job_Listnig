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

// Middleware
app.use(morgan('dev')); // Request logging
app.use(cors()); 
app.use(helmet()); // Add security headers
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(function(err, req, res, next) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: err.message }); // Send error message to the client
  });

// Sample route
app.get('/api/v1', (req, res) => {
    console.log("Welcome to the backend");
    res.send("Welcome to the backend");
});

// main routes
app.use('/api/v1/jobs',Jobs)
app.use('/api/v1/auth',Auth)

// Database connection
dbconnect();

// Start the server
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
