import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
        console.log("MONGODB_URL:", process.env.MONGODB_URL);  // Add this line to debug
        const { connection } = await mongoose.connect(process.env.MONGODB_URL, {
            dbName: DB_NAME
        });
        if (connection) {
            console.log(`Connection to MongoDB: ${connection.host}`);
        }
    } catch (error) {
        console.log("Error connecting to Database", error.message);
        process.exit(1);
    }
}


export default connectDB;