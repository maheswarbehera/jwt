import mongoose from "mongoose"
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv"

dotenv.config({path: './.env'})

const connectDb  = async() => {
    try {
        // console.log(process.env.MONGO_DB_URI)
        
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URI}/${process.env.DB_}`)
        // console.log(connectionInstance)
        // console.log(connectionInstance.connection)
        if(connectionInstance.connection.host == 'localhost'){
            console.log(`⚙️  MongoDB connected local server !! DB HOST: ${connectionInstance.connection.host}, DB Name: ${connectionInstance.connection.name}`); 
        }else{
            console.log(`⚙️  MongoDB connected atlas server !! DB HOST: ${connectionInstance.connection.host}, DB Name: ${connectionInstance.connection.name}`); 
        } 
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
}

export default connectDb;