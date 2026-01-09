import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log('DB Connected')
    } catch (error) {
        console.error("DB not connected")
        process.exit(1)
    }
}

export default connectDB