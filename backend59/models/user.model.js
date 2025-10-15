import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    image: String,
    startBalance: Number,
    hashedPassword: String,
    activated: { type: Boolean, default: false }
});

const UserModel = mongoose.model('User', userSchema);

export const getByEmail = async (email) => {
    const result = await UserModel.findOne({ email });
    return result;
}

export const set = async (user) => {
    const updateDoc = {
        $set: {
            image: user.image,
        },
    };
    const result = await UserModel.updateOne({ email: user.email }, updateDoc);
    return result;
}

export const getExtendedByEmail = async (email) => {
    const results = await UserModel.aggregate([
        {
            $match: {
                email
            }
        },
        {
            $lookup: {
                from: 'history',
                localField: '_id',
                foreignField: 'userId',
                as: 'hist'
            }
        },
        {
            $project: {
                _id: 0,
                email: 1,
                name: 1,
                image: 1,
                startBalance: 1,
                incomeAmount: { $sum: "$hist.income" },
                expenseAmount: { $sum: "$hist.expense" },
                activated: 1
            }
        }
    ]);
    if (results.length) return results[0];
}

export const add = async (user) => {
    return await UserModel.insertOne(user);
}

export const setActive = async (email) => {
    const updateDoc = {
        $set: {
            activated: true,
        },
    };
    return await UserModel.updateOne({ email: email }, updateDoc);
}
