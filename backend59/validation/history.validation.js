import { body, query } from 'express-validator';

export const historyValidation = [
  body('categoryId').notEmpty().withMessage('CategoryId is required.'),
  body('comment').isLength({min: 0, max: 512}).withMessage('Comment length cannot be longer than 512'),
  body('income').isNumeric().withMessage('Income must be numeric'),
  body('expense').isNumeric().withMessage('Expense must be numeric')
];

export const historyQueryValidation = [
  query('from')
    .notEmpty()
    .withMessage('Query parameter "from" is required')
    .isInt({ min: 0 })
    .withMessage('From must be an integer greater than or equal to 0.'),
  query('count')
    .optional()
    .isInt({ min: 10 })
    .withMessage('Count must be 10 or greater')
];