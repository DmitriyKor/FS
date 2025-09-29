import { ObjectId } from "mongodb";
import { mongo } from "../mongo/index.js";

export const getAll = async (userId, from, count) => {
    const db = mongo.client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_HISTORY);
    const countTotal = await collection.countDocuments({ userId: new ObjectId(userId) });

    const historyCursor = collection.aggregate([
        { $match: { userId: new ObjectId(userId) } }, 
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
        { $project: { time:1, name:1, comment:1, categoryId:1, categoryName: { $first: "$category.name"}, income:1, expense:1 } } 
    ]);

    return { items: await historyCursor.toArray(), count: countTotal };
}

export const getItem = async (userId, itemId) => {
    const db = mongo.client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_HISTORY);
    const result = await collection.findOne({ _id: new ObjectId(itemId), userId: userId }, { _id: 1, categoryId: 1, comment: 1, income: 1, expense: 1, time: 1 });
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
    const filter = { _id: new ObjectId(item.id) };
    const updateDoc = {
        $set: {
            comment: true,
            categoryId: true,
            income: true,
            expense: true
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