import User from "../../DB/models/user.model.js";
import jwt from "jsonwebtoken";
import emailEmitter from "../../Utils/send emails/email.event.js";
import { hash,compare } from "../../Utils/hashing/hash.js";
import { encrypt } from "../../Utils/encryption/enctypt.js";


export const register =async(req,res,next)=>{
    //validation  is put as middlewares in the controller before logic , checking on password and confirm password is done in the validation middleware , here , will be only the pure logic for register
        let {userName,email,password ,phone,gender}=req.body;
        let user=await User.findOne({email})
        if(user){
            return next(new Error("user with the same email already exists",{cause:409}))
        }
        let user2=await User.findOne({userName})
                if(user2){
            return next(new Error("user with the same userName already exists",{cause:409}))
        }
        //creating the user in the database
        await User.create({userName,
            email,
            password:hash({text:password}),
            phone:encrypt({text:phone}),
            gender})
        //send emails 
        //take care , first we have a file to use node mailer to send email and this file is a function called sendEmail and takes from me {to: , subject: , html : } and you call this function and pass to it its parameters to make it work , in first we was calling this function here directly but it was taking alot of time on post man , the best practice is to make the call of this function in an event and make to it trigger here when you want to use it , so it will be run in the background and wont take alot of time , so see the file email.event.js which makes this
        emailEmitter.emit("sendEmail",email);
        return  res.status(201).json({success:true,message:"user created successfully"})
}











export const login =async(req,res, next)=>{
    let {email,password}=req.body;
        let user=await User.findOne({email});
        if(!user){
            return  next(new Error("user not found",{cause:403}))
        }
        const match=compare({text:password,hashedText:user.password})
        if(!match){
            return  next(new Error("invalid password",{cause:403}))
        }
        if(!user.isActivated){
            return  next(new Error("you must activate your account first",{cause:403}))
        }
        //now every thing is good , create a token and give it to the user
        const token = jwt.sign({id:user._id, email:user.email},process.env.TOKEN_KEY)

        //activating acount if it was deleted
        if(user.isActivated==true){
            user.isActivated=false;
            await user.save();
        }

        return res.status(200).json({success:true,message:"user logged in successfully" , data:user, token})
}








export const activateAcount=async(req,res,next)=>{
        let {token}=req.params;                                                                //now , this time the token will comes in params when the user clicks on the link came to him in the email , by this click the user is making a get request on this path  auth/is_authinticated/:token , he made a get request by that , so i take the token from it to activate his account (make is activated true)
        let {email}=jwt.verify(token,process.env.TOKEN_KEY);
        let user=await User.findOne({email});
        if(!user){
            return  next(new Error("user not found",{cause:404}))
        }
        //if everything is good , activate the acount and return a response to tell the user that 
        user.isActivated=true;
        await user.save();
        return res.status(200).json({success:true,message:"acount activated successfully"})
}