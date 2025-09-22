import express from 'express';
import * as historyController from '../controllers/history.controller.js';
import { checkTokenHeaders } from '../auth/checkToken.js';
import { historyValidation } from '../validation/history.validation.js';
import { validationHandler } from '../validation/index.validation.js';

const historyRouter = express.Router(); 

historyRouter.get('/', checkTokenHeaders, historyController.getAll);
historyRouter.post('/', checkTokenHeaders, historyValidation, validationHandler, historyController.addItem);
historyRouter.patch('/:id', checkTokenHeaders, historyValidation, validationHandler, historyController.changeItem);
historyRouter.get('/:id', checkTokenHeaders, historyController.getItem);
historyRouter.delete('/:id', checkTokenHeaders, historyController.deleteItem);
historyRouter.delete('/', checkTokenHeaders, historyController.deleteAll);

export default historyRouter;