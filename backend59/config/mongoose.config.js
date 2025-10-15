import mongoose from 'mongoose';

export const connectDB = () => {
    console.log('Mongo URL=',process.env.MONGODB_URL)
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log('✅ Connected to MongoDB with Mongoose');
        })
        .catch(err => console.error('❌ Mongoose connection error:', err));
}