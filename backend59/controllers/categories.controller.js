//import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { GeneralServerError } from '../exceptions/GeneralErrors.js';
//import * as categoriesService from '../services/categories.service.js'
import * as categoriesModel from '../models/categories.model.js'

export const getAll = async (req, res, next) => {
    try {
        const usersCategories = await categoriesModel.getAll(req.user.id);  
        res.status(200).json({
            status: 'OK',
            categories: usersCategories,
        });
    } catch (error) {
        next(new GeneralServerError(500, error.message))
    }
}

export const addItem = async (req, res, next) => {
    const item = { userId: new mongoose.Types.ObjectId(req.user.id), default: false, name: req.body.name, description: req.body.description };
    try {
        const result = await categoriesModel.addItem(item);
        res.status(201).json({
            status: 'OK',
            item: result
        });
    } catch (error) {
        next(new GeneralServerError(500, error.message))
    }
}

export const getItem = async (req, res, next) => {
    try {
        const itemId = req.params.id;
        const categoryItem = await categoriesModel.getItem(req.user.id, itemId);

        if (!categoryItem) {
            next(new GeneralServerError(404, 'Item is missing'))
        }
        res.status(200).json({
            status: 'OK',
            item: categoryItem,
        });
    } catch (error) {
        next(new GeneralServerError(500, error.message))
    }
}

export const changeItem = async (req, res, next) => {
    try {
        const item = { ...req.body, userId: req.user.id};
        if (!item._id) { item._id = req.params.id}
        const result = await categoriesModel.changeItem(item);
        res.status(200).json({
            status: 'OK',
            count: result.modifiedCount
        });
    } catch (error) {
        next(new GeneralServerError(500, error.message))
    }
}

export const deleteItem = async (req, res, next) => {
    try {
        const itemId = new mongoose.Types.ObjectId(req.params.id);
        const result = await categoriesModel.deleteItem(req.user.id, itemId);
        if (!result.acknowledged) {
             next(new GeneralServerError(500, error.message))
        }
        res.status(204).json({
            status: 'OK',
            count: result.deletedCount
        });
    } catch (error) {
        next(new GeneralServerError(500, error.message))
    }
}

export const deleteAll = async (req, res, next) => {
    try {
        const result = await categoriesModel.deleteAll(req.user.id);
        res.status(204).json({
            status: 'OK',
            count: result.deleteCount
        });
    } catch (error) {
        next(new GeneralServerError(500, error.message))
    }
}


