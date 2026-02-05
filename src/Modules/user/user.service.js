import jwt from 'jsonwebtoken'
import User from '../../DB/models/user.model.js';
import cryptojs from 'crypto-js'
import { decrypt, encrypt } from '../../Utils/encryption/enctypt.js';
import { compare, hash } from '../../Utils/hashing/hash.js';

export const profile=async(req,res)=>{
        let user = req.user;                                                  //this user is got from the request object , when i add it in the auth middleware
        return res.status(200).json({success:true,message:"user found successfully" , data:{...user,phone:decrypt({encryptedText:user.phone})}})
}






export const updateProfile=async(req,res,next)=>{
        //first , the validations are done in the validation middlerware and you can pass the req.body without any fear because is passed the validation and all of it is good now 
        if(req.body.phone){
                req.body.phone=encrypt({text:req.body.phone})
        }
        let updatedUser = await User.findByIdAndUpdate(req.user._id,{...req.body},{new:true, runValidators:true});
        return res.status(200).json({success:true,message:"Profile updated successfully!" , data:updatedUser})
}








export const changePassword=async(req,res,next)=>{
    //validations are done on old and new passoword if they are the same and if password and confirm password are not the same 
    //now its time to check if this old password is correct or now , and you have the user in req.user  gave to you from authentication
    let user=await User.findById(req.user._id)
    let {oldPassword,newPassword}=req.body;
    let oldPasswordCheck= compare({text:oldPassword , hashedText:user.password});
    if(!oldPasswordCheck){
        return next(new Error("invalid old password",{cause:403}))
    }
    let updatedUser=await User.findByIdAndUpdate(req.user._id,{password:hash({text:newPassword}),changedAt:Date.now()});
    return res.status(200).json({success:true,message:"password updated successfully", data:updatedUser})
}






export const deactivateAcount=async(req,res,next)=>{
    let deletedAcount = await User.findByIdAndUpdate(req.user._id,{isActivated:false},{new:true , runValidators:true})
    return res.status(200).json({success:true,message:"account deactivated successfully" , data:deletedAcount})

    //acount will be activated successfully and is deleted =false if you make login =>thatl handeled in login service
}