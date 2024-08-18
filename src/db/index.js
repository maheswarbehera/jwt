import mongoose from "mongoose"
import { DB_NAME } from "../constants.js";


const connectDb  = async() => {
    try {
        console.log(process.env.MONGO_DB_URI)
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`)
        // console.log(connectionInstance)
        // console.log(connectionInstance.connection)
        console.log(`⚙️  MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`); 
        console.log(`⚙️  MongoDB connected !! DB Name: ${connectionInstance.connection.name}`); 
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
}

export default connectDb;