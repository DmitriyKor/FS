import express from 'express';
import {getUsers, getUserById} from '../controllers/usersController.js'

const router = express.Router(); 

//middleware for users
router.use((req, res, next) => {
  console.log(`Request received for users: ${req.method} ${req.url}`);
  //req.myField=... for subsequent use
  next(); // Pass control to the next middleware or route handler
});

const myMiddleware = (req, res)=>{
  console.log('my middleware for user id')
}

router.get('/', getUsers);
router.get('/:id', myMiddleware, getUserById);

export default router;