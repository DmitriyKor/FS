import express from 'express';
import * as categoriesController from '../controllers/categories.controller.js';

const categoriesRouter = express.Router(); 

categoriesRouter.get('/', categoriesController.getCategories);
categoriesRouter.post('/', categoriesController.addCategory);
categoriesRouter.get('/:id', categoriesController.getCategoryById);
categoriesRouter.delete('/:id', categoriesController.deleteCategoryById);

export default categoriesRouter;