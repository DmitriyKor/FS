import express from 'express';
import * as historyController from '../controllers/history.controller.js';


const historyRouter = express.Router(); 

historyRouter.get('/', historyController.getHistory);
historyRouter.post('/', historyController.addHistoryItem);
historyRouter.get('/:id', historyController.getHistoryItem);
historyRouter.delete('/:id', historyController.deleteHistoryItem);

export default historyRouter;