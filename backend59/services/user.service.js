import { mongo } from "../mongo/index.js";

export const getByEmail = async (email) => {
    const db = mongo.client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_USERS);
    try {
        const user = await collection.findOne({ email: email }, {name:1, email:1, startBalance:1});
        return user;
    } catch (error) {
        console.error('Error of search:', error);
        throw error;
    }
}

export const add = async (user) => {
    const db = mongo.client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_USERS);
    try {
        const result = await collection.insertOne(user);
        console.log('Document inserted:', result.resultId);
        return result;
    } catch (error) {
        console.error('Error inserting document:', error);
        throw error;
    };
}

export const setActive = async (email) => {
    const db = mongo.client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection(process.env.MONGODB_COLLECTION_USERS);
    try {
        const filter = { email: email };
        const updateDoc = {
            $set: {
                activated: true,
            },
        };
        const result = await collection.updateOne(filter, updateDoc);
        console.log(`${result.matchedCount} document(s) matched the filter.`);
        console.log(`${result.modifiedCount} document(s) were updated.`);
        return result;
    } catch (error) {
        console.error('Error of search:', error);
        throw error;
    }
}
