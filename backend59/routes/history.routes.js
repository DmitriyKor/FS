import express from 'express';
import * as historyController from '../controllers/history.controller';

const historysRouter = express.Router(); 

historysRouter.get('/', historyController.getHistory);
historysRouter.post('/', historyController.addHistoryItem);
historysRouter.get('/:id', historyController.getHistoryItem);
historysRouter.delete('/:id', historyController.deleteHistoryItem);

export default historysRouter;