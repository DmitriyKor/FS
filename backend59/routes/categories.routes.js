import express from 'express';
import * as categoriesController from '../controllers/categories.controller.js';

const categoriesRouter = express.Router(); 

categoriesRouter.get('/', categoriesController.getAll);
categoriesRouter.post('/', categoriesController.addItem);
categoriesRouter.get('/:id', categoriesController.getItem);
categoriesRouter.patch('/:id', categoriesController.changeItem);
categoriesRouter.delete('/:id', categoriesController.deleteItem);
categoriesRouter.delete('/', categoriesController.deleteAll);


export default categoriesRouter;