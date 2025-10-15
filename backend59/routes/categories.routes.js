import express from 'express';
import * as categoriesController from '../controllers/categories.controller.js';
import { checkTokenHeaders } from '../auth/checkToken.js';
import { categoryValidation } from '../validation/categories.validation.js';
import { validationHandler } from '../validation/index.validation.js';

const categoriesRouter = express.Router(); 

categoriesRouter.get('/', checkTokenHeaders, categoriesController.getAll);
categoriesRouter.post('/', checkTokenHeaders, categoryValidation, validationHandler, categoriesController.addItem);
categoriesRouter.get('/:id', checkTokenHeaders, categoriesController.getItem);
categoriesRouter.patch('/:id', checkTokenHeaders, categoriesController.changeItem);
categoriesRouter.delete('/:id', checkTokenHeaders, categoriesController.deleteItem);
categoriesRouter.delete('/', checkTokenHeaders, categoriesController.deleteAll);

export default categoriesRouter;