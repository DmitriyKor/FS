import express from 'express';
const app = express()
const port = 3000

import {router as homeRoutes} from './routes/home.js';

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware or route handler
});

app.use(express.json());

app.use('/', homeRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})