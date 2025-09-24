import { body } from 'express-validator';

export const categoryValidation = [
  body('name').notEmpty().withMessage('Name is required.'),
  body('name').isLength({min: 2, max: 256}).withMessage('Wrong length of name'),
  body('description').isLength({max: 512}).withMessage('Max length of description is 512 characters'),
]
