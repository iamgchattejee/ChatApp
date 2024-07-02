import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try{
        console.log("Connecting to MongoDB");
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to MongoDB");
    }
    catch(err){
        console.log(err);
    }
};

export default connectToMongoDB;