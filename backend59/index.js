import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import router from './routes/index.routes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const SECRET_KEY_COOKIES = process.env.SECRET_KEY_COOKIES;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

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
  res.status(statusCode).json({message: err.message || 'An unexpected error occurred.'})
})

//root route
app.use('/api', router);

//static files 
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})