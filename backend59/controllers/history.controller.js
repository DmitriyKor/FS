import { ObjectId } from 'mongodb';
import { GeneralServerError } from '../exceptions/GeneralErrors.js';
import * as historyService from '../services/history.service.js'

export const getAll = async (req, res, next) => {
    try {
        const from = req.query.from || 0;
        const count = req.query.count || 50;
        const filter = req.query.filter || 'all';
        const usersHistory = await historyService.getAll(req.user.id, from, count, filter);
        
        res.status(200).json({
            status: 'OK',
            history: usersHistory,
        });
    } catch (error) {
        next(new GeneralServerError(500, error.message))
    }
}

export const addItem = async (req, res, next) => {
    const item = {userId: new ObjectId(req.user.id), categoryId: new ObjectId(req.body.categoryId), time: new Date(), 
        comment: req.body.comment, income: Number(req.body.income), expense: Number(req.body.expense)};
    
    console.log('history addItem', item);
    
    try {
        const result = await historyService.addItem(item);
        if (!result.acknowledged) {
            next(new GeneralServerError(500, 'Database error'))
        }
        item.id = result.resultId;
        res.status(201).json({
            status: 'OK',
            item: item,
        });

    } catch (error) {
        next(new GeneralServerError(500, error.message))
    }
}

export const getItem = async (req, res, next) => {
    try {
        const itemId = req.params.id;
        const historyItem = await historyService.getItem(req.user.id, itemId);
        
        if (!historyItem) {
            next(new GeneralServerError(404, 'Item is missing'))
        }
        res.status(200).json({
            status: 'OK',
            item: historyItem,
        });
    } catch (error) {
        next(new GeneralServerError(500, error.message))
    }
}

export const deleteItem = async (req, res, next) => {
    try {
        const itemId = req.params.id;

        console.log('delete item, req.params.id=', req.params.id)

        const result = await historyService.deleteItem(req.user.id, itemId);
        res.status(204).json({
            status: 'OK',
            count: result.deleteCount
        });
    } catch (error) {
        next(new GeneralServerError(500, error.message))
    }
}

export const deleteAll = async (req, res, next) => {
    try {

        console.log('delete all')        
        const result = await historyService.deleteAll(req.user.userId);
        res.status(204).json({
            status: 'OK',
            count: result.deleteCount
        });
    } catch (error) {
        next(new GeneralServerError(500, error.message))
    }
}

export const changeItem = async (req, res, next) => {
    try {
        
        const item = {userId: new ObjectId(req.user.id), categoryId: new ObjectId(req.body.categoryId),  
        comment: req.body.comment, income: Number(req.body.income), expense: Number(req.body.expense)};
        
        
        if (!item._id) {item._id = new ObjectId(req.params.id)}
        console.log('changeItem.item=', item)
        const result = await historyService.changeItem(item);
        console.log('changeItem.result=', result);
        
        if (!result.acknowledged) {
            next(new GeneralServerError(500, 'Database error'))
        }
        res.status(200).json({
            status: 'OK',
            count: result.modifiedCount
        });
    } catch (error) {
        next(new GeneralServerError(500, error.message))
    }
}