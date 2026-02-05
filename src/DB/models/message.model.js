import mongoose, { Types } from "mongoose";

let messageSchema=mongoose.Schema({
    content:{
        type:String,
        minLength:[6,"message cant be less than 6 letters"],
        maxLength:[700,"message cant be more that 700 letter"],
        required:[true,"message cant be empty"]
    },
    sender:{
        type:Types.ObjectId,
        ref:"User"                                                                                                              //this is for when making join not for making relationship , when making join and get the message we will got the user with this id 
    },
    reciever:{
        type:Types.ObjectId,
        ref:"User"
    }
})

let Message=mongoose.model("message",messageSchema)
export default Message;