import { ObjectId } from "mongodb";
import { mongo } from "../mongo/index.js";

export const getAll = async (userId) => {
    const db = mongo.client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_CATEGORIES);
    const categoriesCursor = await collection.aggregate([
        {
            $match: {
                userId: new ObjectId(userId)
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

    //const categoriesCursor = await collection.find({ userId: new ObjectId(userId) });
    return await categoriesCursor.toArray();
}

export const addMany = async (items) => {
    const db = mongo.client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_CATEGORIES);
    return await collection.insertMany(items);
}

export const getItem = async (userId, itemId) => {
    const db = mongo.client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_CATEGORIES);
    return await collection.findOne({ _id: new ObjectId(itemId), userId: new ObjectId(userId) });
}

export const addItem = async (item) => {
    const db = mongo.client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_CATEGORIES);
    return await collection.insertOne(item);
}

export const changeItem = async (item) => {
    const db = mongo.client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_CATEGORIES);
    const filter = { _id: new ObjectId(item.id) };
    const updateDoc = {
        $set: {
            name: true,
            description: true
        },
    };
    return await collection.updateOne(filter, updateDoc);
}

export const deleteItem = async (userId, itemId) => {
    const db = mongo.client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_CATEGORIES);
    return await db.collection.deleteOne({ userId: new ObjectId(userId), _id: new ObjectId(itemId), default: false });
}

export const deleteAll = async (userId) => {
    const db = mongo.client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_CATEGORIES);
    return await db.collection.deleteMany({ userId: new ObjectId(userId), default: false });
}

