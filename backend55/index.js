import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import routerUsers from './routes/users.js';
import routerHome from './routes/home.js';

dotenv.config();

const ENDPOINT_USERS = process.env.ENDPOINT_USERS || '/users';
const ENDPOINT_HOME = '/';

const app = express();
const port = 3000;
const secret = 'your_secret_key'; 

//global middlewares

app.use(cookieParser(secret)); 

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware or route handler
});

app.use(express.json());

//routes

app.use(ENDPOINT_USERS, routerUsers);
app.use(ENDPOINT_HOME, routerHome);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})