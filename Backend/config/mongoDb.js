import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/prescipto-app').then((res)=>{
        console.log("Database Connected");
    }).catch((err)=>{
        console.log("Connection Unsuccessfull.")
    });
}

export default connectDB;