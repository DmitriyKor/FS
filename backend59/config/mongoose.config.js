import mongoose from 'mongoose';
import { UserModel } from '../models/user.model.js';


// const check = async () => {
//     const userSchema = new mongoose.Schema({
//         name: String,
//         email: { type: String, required: true, unique: true },
//         image: String,
//         startBalance: Number,
//         hashedPassword: String,
//         activated: { type: Boolean, default: false }
//     }, { strict: false });

//     const UserModel = mongoose.model('User', userSchema);

//     const users = await UserModel.find({});
//     console.log(users);
// }

export const connectDB = () => {
    console.log('Mongo URL=',process.env.MONGODB_URL)
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log('✅ Connected to MongoDB with Mongoose');
           // check();
        })
        .catch(err => console.error('❌ Mongoose connection error:', err));
}