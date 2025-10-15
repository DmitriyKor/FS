//import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { GeneralServerError } from '../exceptions/GeneralErrors.js';
//import * as historyService from '../services/history.service.js'
import * as historyModel from '../models/history.models.js'
//import * as userService from '../services/user.service.js'
import * as userModel from '../models/user.model.js'

export const getAll = async (req, res, next) => {
    try {
        const from = req.query.from || 0;
        const count = req.query.count || 50;
        const filter = req.query.filter || 'all';
        const usersHistory = await historyModel.getAll(req.user.id, from, count, filter);
        res.status(200).json({
            status: 'OK',
            history: usersHistory,
        });
    } catch (error) {
        next(new GeneralServerError(500, error.message))
    }
}

export const addItem = async (req, res, next) => {
    const item = {userId: req.user.id, categoryId: req.body.categoryId, time: new Date(), 
        comment: req.body.comment, income: Number(req.body.income), expense: Number(req.body.expense)};
    try {
        const result = await historyModel.addItem(item);
        //request user's extended data (to recalculate amounts)
        const user = await userModel.getExtendedByEmail(req.user.email);
        res.status(201).json({
            status: 'OK',
            item: result,
            user
        });
    } catch (error) {
        next(new GeneralServerError(500, error.message))
    }
}

export const getItem = async (req, res, next) => {
    try {
        const itemId = req.params.id;
        const historyItem = await historyModel.getItem(req.user.id, itemId);
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
        const result = await historyModel.deleteItem(req.user.id, itemId);
        if (!result.acknowledged) {
             next(new GeneralServerError(500, error.message))
        }
        //request user's extended data (amounts)
        const user = await userModel.getExtendedByEmail(req.user.email);
        res.status(200).json({
            status: 'OK',
            count: result.deletedCount,
            user
        });
    } catch (error) {
        next(new GeneralServerError(500, error.message))
    }
}

export const deleteAll = async (req, res, next) => {
    try {     
        const result = await historyModel.deleteAll(req.user.userId);
        if (!result.acknowledged) {
             next(new GeneralServerError(500, error.message))
        }
        //request user's extended data (amounts)
        const user = await userModel.getExtendedByEmail(req.user.email);
        res.status(204).json({
            status: 'OK',
            count: result.deletedCount,
            user
        });
    } catch (error) {
        next(new GeneralServerError(500, error.message))
    }
}

export const changeItem = async (req, res, next) => {
    try {
        const item = {userId: req.user.id, categoryId: req.body.categoryId,  
        comment: req.body.comment, income: Number(req.body.income), expense: Number(req.body.expense)};
        
        if (!item._id) {item._id = new mongoose.Types.ObjectId(req.params.id)}
        const result = await historyModel.changeItem(item);
        if (!result.acknowledged) {
            next(new GeneralServerError(500, 'Database error'))
        }

        //request user's extended data (amounts)
        const user = await userModel.getExtendedByEmail(req.user.email);

        res.status(200).json({
            status: 'OK',
            count: result.modifiedCount,
            user
        });
    } catch (error) {
        next(new GeneralServerError(500, error.message))
    }
}