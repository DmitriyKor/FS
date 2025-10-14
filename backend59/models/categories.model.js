import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    default: Boolean
});

export const CategoryModel = mongoose.model('Category', categorySchema, 'categories');

export const getAll = async (userId) => {
    const results = await CategoryModel.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId)
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

export const addMany = async (items) => {
    return await CategoryModel.insertMany(items);
}

export const getItem = async (userId, itemId) => {
    const results = await CategoryModel.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId),
                _id: new mongoose.Types.ObjectId(itemId)
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
    //console.log('categories=', results)
    return results? results[0] : null;
}

export const addItem = async (item) => {
    return await CategoryModel.insertOne(item);
}

export const changeItem = async (item) => {
    const updateDoc = {
        $set: {
            name: true,
            description: true
        },
    };
    return await CategoryModel.updateOne( { _id: new mongoose.Types.ObjectId(item.id) }, updateDoc);
}

export const deleteItem = async (userId, itemId) => {
    return await CategoryModel.deleteOne({ userId: new mongoose.Types.ObjectId(userId), _id: new mongoose.Types.ObjectId(itemId), default: false });
}

export const deleteAll = async (userId) => {
    return null//await CategoryModel.deleteMany({ userId: new mongoose.Types.ObjectId(userId), default: false });
}

