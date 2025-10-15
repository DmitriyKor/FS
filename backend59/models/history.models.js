import mongoose from 'mongoose';
import { ensureObjectId, ensureValueObjectId } from './objectIdHelper.js';

const historySchema = new mongoose.Schema({
    comment: String,
    categoryId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    income: Number,
    expense: Number,
    time: Date
});

historySchema.index({ categoryId: 1 });
historySchema.index({ userId: 1 });
historySchema.index({ time: -1 });

const HistoryModel = mongoose.model('history', historySchema, 'history');

export const getAll = async (userId, from, count, filter) => {
    
    userId = ensureValueObjectId(userId);
    
    const match = (filter == 'income') ? { "userId": userId, "income": { "$gt": 0 } } :
         (filter == 'expense') ? { "userId": userId, "expense": { "$gt": 0 } } : { "userId": userId};

    const countTotal = await HistoryModel.countDocuments(match);

    const results = await HistoryModel.aggregate([
        { $match: match },
        {
            $lookup: {
                from: 'categories',
                localField: 'categoryId',
                foreignField: '_id',
                as: 'category'
            }
        },
        { $sort: { time: -1 } },
        { $skip: +from },
        { $limit: +count },
        { $project: { time: 1, description: 1, comment: 1, categoryId: 1, categoryName: { $first: "$category.name" }, income: 1, expense: 1 } }
    ]);

    return { items: results, count: countTotal };
}

export const getItem = async (userId, itemId) => {
    userId = ensureValueObjectId(userId);
    const _id = ensureValueObjectId(itemId);
    const results = await HistoryModel.aggregate([
        { $match: { userId, _id } },
        {
            $lookup: {
                from: 'categories',
                localField: 'categoryId',
                foreignField: '_id',
                as: 'category'
            }
        },
        { $project: { time: 1, description: 1, comment: 1, categoryId: 1, categoryName: { $first: "$category.name" }, income: 1, expense: 1 } }
    ]);
    return results.length > 0 ? results[0] : null;
}

export const addItem = async (item) => {
    ensureObjectId(item, "userId");
    ensureObjectId(item, "categoryId");
    const result = await HistoryModel.insertOne(item);
    delete result.userId;
    return result;
}

export const changeItem = async (item) => {
    ensureObjectId(item, "_id");
    ensureObjectId(item, "userId");
    ensureObjectId(item, "categoryId");
    console.log('changeItem: ', item)
    const updateDoc = {
        $set: {
            comment: item.comment,
            categoryId: item.categoryId,
            income: item.income,
            expense: item.expense
        },
    };
    return await HistoryModel.updateOne( { _id: item._id}, updateDoc);
}

export const deleteItem = async (userId, itemId) => {
    userId = ensureValueObjectId(userId);
    const _id = ensureValueObjectId(itemId);
    return await HistoryModel.deleteOne({ userId, _id });
}

export const deleteAll = async (userId) => {
    userId = ensureValueObjectId(userId);
    return await HistoryModel.deleteMany({ userId});
}