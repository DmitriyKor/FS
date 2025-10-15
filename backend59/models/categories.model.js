import mongoose from 'mongoose';
import { ensureObjectId, ensureValueObjectId } from './objectIdHelper.js';

const categorySchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    description: String,
    default: Boolean
});

const CategoryModel = mongoose.model('Category', categorySchema, 'categories');

export const getAll = async (userId) => {
    userId = ensureValueObjectId(userId);
    const results = await CategoryModel.aggregate([
        {
            $match: {
                userId
            }
        },
        {
            $lookup: {
                from: 'history',
                localField: '_id',
                foreignField: 'categoryId',
                as: 'hist'
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                description: 1,
                default:1,
                incomeAmount: { $sum: "$hist.income" },
                expenseAmount: { $sum: "$hist.expense" },
            }
        }
    ]);
    return results;
}

export const getItem = async (userId, itemId) => {
    userId = ensureValueObjectId(userId);
    const _id = ensureValueObjectId(itemId);
    const results = await CategoryModel.aggregate([
        {
            $match: {
                userId,
                _id
            }
        },
        {
            $lookup: {
                from: 'history',
                localField: '_id',
                foreignField: 'categoryId',
                as: 'hist'
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                description: 1,
                default:1,
                incomeAmount: { $sum: "$hist.income" },
                expenseAmount: { $sum: "$hist.expense" },
            }
        }
    ]);
    return results? results[0] : null;
}

export const addItem = async (item) => {
    ensureObjectId(item, "userId");
    const result = await CategoryModel.insertOne(item);
    delete result.userId;
    return result;
}

export const addMany = async (items) => {
    items = items.map((item)=>ensureObjectId(item, "userId"));
    return await CategoryModel.insertMany(items);
}

export const changeItem = async (item) => {
    ensureObjectId(item, "userId");
    ensureObjectId(item, "_id");
    const updateDoc = {
        $set: {
            name: item.name,
            description: item.description,
        },
    };
    return await CategoryModel.updateOne( { _id: item._id}, updateDoc);
}

export const deleteItem = async (userId, itemId) => {
    userId = ensureValueObjectId(userId);
    itemId = ensureValueObjectId(itemId);
    return await CategoryModel.deleteOne({ userId, _id: itemId, default: false });
}

export const deleteAll = async (userId) => {
    userId = ensureValueObjectId(userId);
    return await CategoryModel.deleteMany({ userId, default: false });
}

