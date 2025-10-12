import express from 'express';
import * as historyController from '../controllers/history.controller.js';
import { historyQueryValidation, historyValidation } from '../validation/history.validation.js';
import { validationHandler } from '../validation/index.validation.js';
import { checkTokenHeaders } from '../auth/checkToken.js';

const historyRouter = express.Router(); 

historyRouter.get('/', checkTokenHeaders, historyQueryValidation, validationHandler, historyController.getAll);
historyRouter.post('/', checkTokenHeaders, historyValidation, validationHandler, historyController.addItem);
historyRouter.patch('/:id', checkTokenHeaders, historyValidation, validationHandler, historyController.changeItem);
historyRouter.get('/:id', checkTokenHeaders, historyController.getItem);
historyRouter.delete('/:id', checkTokenHeaders, historyController.deleteItem);
historyRouter.delete('/', checkTokenHeaders, historyController.deleteAll);

export default historyRouter;