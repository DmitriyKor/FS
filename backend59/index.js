import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/index.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY_COOKIES = process.env.SECRET_KEY_COOKIES;

//global middlewares

app.use(
    cors(
        {
            origin: '*'
        }
    )
)

app.use(cookieParser(SECRET_KEY_COOKIES)); 

//log
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

//route from the root
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})