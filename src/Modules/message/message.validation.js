import joi from 'joi'
import { Types } from 'mongoose';

export const sendMessageSchema= joi.object({
    content: joi.string().min(6).max(700).required(),
    reciever:joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value)){
            return true
        }
        return helper.message("Invalid objectId")
    })
}).required()





export const getSingelMessageSchema=joi.object({
    msgId:joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value)){
            return true
        }
        return helper.message("Invalid objectId")
    }).required()
}).required()