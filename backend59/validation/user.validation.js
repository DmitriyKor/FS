import { body } from 'express-validator';

export const userLoginValidation = [
  body('email').isEmail().withMessage('Invalid email format.'),
  body('password').isLength({ min: 8, max: 64 }).withMessage('Password must be at least 8 characters long.')
];

export const userRegisterValidation = [
  body('name').notEmpty().withMessage('Name is required.'),
  body('name').isLength({min: 2, max: 256}).withMessage('Wrong length of name'),
  body('name').isAlpha().withMessage('Name must be alphabetic'),
  body('startBalance').isNumeric().withMessage('Start balance must be numeric'),
  body('password')
    .isStrongPassword({
      minLength: 8,
      maxLength: 64,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }).withMessage('Password must include at least 8 characters, one lowercase, one uppercase, one number, and one symbol.'),
  body('email').isEmail().withMessage('Invalid email format.'),
];

