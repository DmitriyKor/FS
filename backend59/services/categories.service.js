import { ObjectId } from "mongodb";
import { mongo } from "../mongo/index.js";

export const getAll = async (userId) => {
    const db = mongo.client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_CATEGORIES);
    const categoriesCursor = await collection.find({ userId: userId }, { _id: 1, name: 1, description: 1});
    return await historyCursor.toArray();
}