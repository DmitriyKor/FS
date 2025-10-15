import { ObjectId } from "mongodb";
import { mongo } from "../mongo/index.js";

export const getAll = async (userId, from, count, filter) => {
    const db = mongo.client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_HISTORY);

    var match;
    if (!filter || filter == 'all') { match = { "userId": new ObjectId(userId) } }
    else if (filter == 'income') { match = { "userId": new ObjectId(userId), "income": { "$gt": 0 } } }
    else if (filter == 'expense') {
        match = { "userId": new ObjectId(userId), "expense": { "$gt": 0 } }
    };

    const countTotal = await collection.countDocuments(match);

    const historyCursor = await collection.aggregate([
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

    return { items: await historyCursor.toArray(), count: countTotal };
}

export const getItem = async (userId, itemId) => {
    const db = mongo.client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_HISTORY);

    const historyCursor = await collection.aggregate([
        { $match: { userId: new ObjectId(userId), _id: new ObjectId(itemId) } },
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
    const historyArray = await historyCursor.toArray();
    const result = historyArray.length > 0 ? historyArray[0] : null;
    //const result = await collection.findOne({ _id: new ObjectId(itemId), userId: userId }, { _id: 1, categoryId: 1, comment: 1, income: 1, expense: 1, time: 1 });
    return result;
}

export const addItem = async (item) => {
    const db = mongo.client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_HISTORY);
    return await collection.insertOne(item);
}

export const changeItem = async (item) => {
    const db = mongo.client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_HISTORY);
    const filter = { _id: new ObjectId(item._id) };
    const updateDoc = {
        $set: {
            comment: item.comment,
            categoryId: new ObjectId(item.categoryId),
            income: item.income,
            expense: item.expense
        },
    };
    return await collection.updateOne(filter, updateDoc);
}

export const deleteItem = async (userId, itemId) => {
    const db = mongo.client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_HISTORY);
    return await collection.deleteOne({ userId: new ObjectId(userId), _id: new ObjectId(itemId) });
}

export const deleteAll = async (userId) => {
    const db = mongo.client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_HISTORY);
    return await collection.deleteMany({ userId: new ObjectId(userId) });
}