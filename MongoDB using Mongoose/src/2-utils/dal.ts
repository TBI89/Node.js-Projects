import mongoose from "mongoose";
import appConfig from "./app-config";

async function connect(): Promise<void> {
    try {
        const db = await mongoose.connect(appConfig.mongodbConnectionString);
        console.log(`We are connected to MongoDb, database: ${db.connections[0].name}`);
        
    }
    catch (err: any) {
        console.log(err);
    }
}

export default {
    connect
};