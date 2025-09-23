import { ObjectId } from "mongodb";
import { mongo } from "../mongo/index.js";

export const getAll = async (userId, from, count) => {
    const db = mongo.client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_HISTORY);
    const countTotal = await collection.countDocuments({ userId: userId });

    const historyCursor = collection.aggregate([
        { $match: { userId: userId } }, 
        { $sort: { time: -1 } },    
        { $skip: +from },                   
        { $limit: +count },                    
        { $project: { userId:0 } } 
    ])
    // projection does not work here? 
    //const historyCursor = await collection.find({ userId: userId }, { userId:0}).sort({time: -1}).skip(+from).limit(+count);
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
    await collection.updateOne(filter, updateDoc);
    return;
}

export const deleteItem = async (userId, itemId) => {
    const db = mongo.client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_HISTORY);
    db.collection.deleteOne({ userId: userId, _id: new ObjectId(itemId) });
    return;
}

export const deleteAll = async (userId) => {
    const db = mongo.client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_HISTORY);
    db.collection.deleteMany({ userId });
    return;
}