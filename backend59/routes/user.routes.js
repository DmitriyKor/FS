import express from 'express';
import * as userController from '../controllers/user.controller';

const userRouter = express.Router(); 

//middleware for users
userRouter.use((req, res, next) => {
  console.log(`Request received for user: ${req.method} ${req.url}`);
  //req.myField=... for subsequent use
  next(); // Pass control to the next middleware or route handler
});

const myMiddleware = (req, res)=>{
  console.log('my middleware for user id')
}

userRouter.get('/', userController.getUserInfo);
userRouter.post('/', userController.setUser);
userRouter.post('/google-auth', userController.authUserGoogle);

export default userRouter;