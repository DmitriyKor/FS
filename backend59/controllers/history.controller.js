import { ObjectId } from 'mongodb';
import { GeneralServerError } from '../exceptions/GeneralErrors.js';
import * as historyService from '../services/history.service.js'

export const getAll = async (req, res, next) => {
    try {
        const from = req.query.from;
        const count = req.query.count || 50;
        console.log('getAll from, count:', from, count);
        const usersHistory = await historyService.getAll(req.user.id, from, count);
        res.status(200).json({
            status: 'OK',
            history: usersHistory,
        });
    } catch (error) {
        next(new GeneralServerError(500, error.message))
    }
}

export const addItem = async (req, res, next) => {
    const item = {...req.body, userId: new ObjectId(req.user.id), categoryId: new ObjectId(req.body.categoryId), time: new Date() };
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
        console.log('getItem historyItem = ', historyItem);
        
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
        const result = historyService.deleteItem(req.user.userId, itemId);
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
        const result = historyService.deleteAll(req.user.userId);
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
        const item = {...req.body, userId: new ObjectId(req.user.id), categoryId: new ObjectId(req.body.categoryId)};     
        if (!item._id) {item._id = new ObjectId(req.params.id)}
        const result = historyService.changeItem(item);
        res.status(200).json({
            status: 'OK',
            count: result.modifiedCount
        });
    } catch (error) {
        next(new GeneralServerError(500, error.message))
    }
}