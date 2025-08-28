import express from 'express';

const homeRouter = express.Router(); 

homeRouter.get('/', function(req, res, next) {
  res.send('Home');
})

export default homeRouter;