import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
    comment: String,
    categoryId: mongoose.Schema.Types.ObjectId,
    income: Number,
    expense: Number,
    time: Date
});

historySchema.index({ categoryId: 1 });
historySchema.index({ time: -1 });

export const HistoryModel = mongoose.model('history', historySchema, 'history');

export const getAll = async (userId, from, count, filter) => {

    var match;
    if (!filter || filter == 'all') { match = { "userId": new mongoose.Types.ObjectId(userId) } }
    else if (filter == 'income') { match = { "userId": new mongoose.Types.ObjectId(userId), "income": { "$gt": 0 } } }
    else if (filter == 'expense') {
        match = { "userId": new mongoose.Types.ObjectId(userId), "expense": { "$gt": 0 } }
    };

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
    const results = await HistoryModel.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId), _id: new mongoose.Types.ObjectId(itemId) } },
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
    return await HistoryModel.insertOne(item);
}

export const changeItem = async (item) => {
    console.log('changeItem: ', item)
    const updateDoc = {
        $set: {
            comment: item.comment,
            categoryId: new mongoose.Types.ObjectId(item.categoryId),
            income: item.income,
            expense: item.expense
        },
    };
    return await HistoryModel.updateOne( { _id: new mongoose.Types.ObjectId(item._id) }, updateDoc);
}

export const deleteItem = async (userId, itemId) => {
    return await HistoryModel.deleteOne({ userId: new mongoose.Types.ObjectId(userId), _id: new mongoose.Types.ObjectId(itemId) });
}

export const deleteAll = async (userId) => {
    return await HistoryModel.deleteMany({ userId: new mongoose.Types.ObjectId(userId) });
}