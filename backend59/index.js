import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './routes/index.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;

//global middlewares

app.use(cookieParser(SECRET_KEY)); 

//log
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware or route handler
});

//parse json
app.use(express.json());

//error handling
app.use((err, req, res, next)=>{
  console.log(err);
})

//root path
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})