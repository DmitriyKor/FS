import express from 'express';
import * as userController from '../controllers/user.controller.js';
import { userLoginValidation, userRegisterValidation } from '../validation/user.validation.js';
import { validationHandler } from '../validation/index.validation.js';
import { checkTokenHeaders } from '../auth/checkToken.js';
import { uploadSingleImageMdl } from '../middleware/upload.middleware.js';
import { uploadImage } from '../controllers/upload.controller.js';

const userRouter = express.Router(); 

//middleware for user
userRouter.use((req, res, next) => {
  console.log(`Request received for user: ${req.method} ${req.url}`);
  //req.myField=... for subsequent use
  next(); // Pass control to the next middleware or route handler
});

userRouter.get('/', checkTokenHeaders, userController.getInfo);
userRouter.post('/login', userLoginValidation, validationHandler, userController.login);
userRouter.get('/activate', userController.activate);
userRouter.post('/register', userRegisterValidation, validationHandler, userController.register);
userRouter.post("/image", uploadSingleImageMdl, uploadImage);
userRouter.post('/google-auth', userController.authGoogle);

export default userRouter;