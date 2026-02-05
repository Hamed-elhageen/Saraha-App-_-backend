import mongoose from "mongoose";

    const connectDB=async()=>{
    await  mongoose.connect(process.env.DATABASE_LINK).then(()=>{
        console.log("connected to the database successfully")
    }).catch((error)=>{
        console.log("Failed to connect to the database :" + error.message)
    })
}
export default connectDB;