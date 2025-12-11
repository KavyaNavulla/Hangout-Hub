import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
    if (isConnected) return;

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "hangouthub",
        });
        isConnected = true;
        console.log("Database connected");
    } catch (error) {
        console.log("DB Error:", error);
    }
}
