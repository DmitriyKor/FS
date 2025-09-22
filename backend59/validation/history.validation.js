import { body } from 'express-validator';

export const historyValidation = [
  body('categoryId').notEmpty().withMessage('CategoryId is required.'),
  body('comment').isLength({min: 0, max: 512}).withMessage('Comment length cannot be longer than 512'),
  body('income').isNumeric().withMessage('Income must be numeric'),
  body('expense').isNumeric().withMessage('Expense must be numeric')
];