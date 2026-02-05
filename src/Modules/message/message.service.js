import Message from "../../DB/models/message.model.js";
import User from "../../DB/models/user.model.js";

export const sendMessage=async(req,res,next)=>{
    let {content,reciever}=req.body;
    let senderUser=req.user;
    //we checked on sender in authentcation and authorization from token , now we want to check if the reciever is found or not :
    let recieverUser= await User.findById(reciever);
    if(!recieverUser){
        return next(new Error("Receiver not found",{cause:404}))
    }
    await Message.create({content,reciever,sender:senderUser._id});
    return res.status(201).json({success:true,message:"message send successfully"})

}
















export const getSingleMessage=async(req,res,next)=>{
    let {msgId}=req.params;
    let user=req.user
    let msg=await Message.findById(msgId).populate([
        {path:"sender",select:"email"},
        {path:"reciever",select:"email"}
    ]);
    if(!msg){
        return next(new Error("Message not found",{cause:404}))
    }
    if(msg.sender.email!==user.email && msg.reciever.email!==user.email){               //here iam checking on the user who wants this message , if he is not the sender or the reciever of the message , so he is not authorized to see it
        return next(new Error("You are not authorized to see this message",{cause:401}))
    }
    return res.status(200).json({success:true,message:"message found successfully",data:msg})
}








export const getAllMessages=async (req,res,next)=>{
    let user=req.user;
    let {flag}=req.query;                                                                  //in post man you will add /?flag=inbox      to get all messages sent to you or      /?flag=outbox     to see all the messages you sent
    if(flag==="inbox"){
        let allRecievedMessages=await Message.find({reciever:user._id})
        return res.status(200).json({success:true,message:"all recieved messages found :" ,data:allRecievedMessages})
    }

    if(flag==="outbox"){
        let allSentMessages=await Message.find({sender:user._id})
        return res.status(200).json({success:true,message:"all sent messages found :" ,data:allSentMessages})
    }
}