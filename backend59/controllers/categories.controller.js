import { ObjectId } from 'mongodb';
import { GeneralServerError } from '../exceptions/GeneralErrors.js';
import * as categoriesService from '../services/categories.service.js'

export const getAll = async (req, res, next) => {
    try {
        const usersCategories = await categoriesService.getAll(req.user.id);
        res.status(200).json({
            status: 'OK',
            categories: usersCategories,
        });
    } catch (error) {
        next(new GeneralServerError(500, error.message))
    }
}

export const addItem = async (req, res, next) => {
    const item = { userId: new ObjectId(req.user.id), default: false, name: req.body.name, description: req.body.description };
    try {
        const result = await categoriesService.addItem(item);
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
        const categoryItem = await categoriesService.getItem(req.user.id, itemId);

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
        const item = { ...req.body, userId: new ObjectId(req.user.id) };
        if (!item._id) { item._id = new ObjectId(req.params.id) }
        const result = categoriesService.changeItem(item);
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
        const itemId = req.params.id;
        const result = categoriesService.deleteItem(req.user.userId, itemId);
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
        const result = categoriesService.deleteAll(req.user.userId);
        res.status(204).json({
            status: 'OK',
            count: result.deleteCount
        });
    } catch (error) {
        next(new GeneralServerError(500, error.message))
    }
}


