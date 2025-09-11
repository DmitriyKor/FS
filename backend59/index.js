import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import {engine} from 'express-handlebars'

import router from './routes/index.routes.js';
import { initMongo } from './mongo/index.js';
import { add } from './services/user.services.js';

const PORT = process.env.PORT || 3000;
const SECRET_KEY_COOKIES = process.env.SECRET_KEY_COOKIES;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set Handlebars as the view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // specify views directory

initMongo();

//global middlewares

app.use(
    cors(
        {
            origin: '*'
        }
    )
)

app.use(cookieParser(SECRET_KEY_COOKIES)); 

//logging
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware or route handler
});

//parse json
app.use(express.json());

//error handling
app.use((err, req, res, next)=>{
  const statusCode = err.statusCode || 500; 
  res.status(statusCode).json({status: 'error', message: err.message || 'An unexpected error occurred.'})
})

//root route
app.use('/api', router);

//static files 
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})