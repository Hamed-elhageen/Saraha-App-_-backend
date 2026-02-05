import joi from 'joi'
export const updateProfileSchema=joi.object({
        userName:joi.string().min(2).max(20),
        phone:joi.string()
}).required()
//in update profile schema you must send an object (that' required ) , but things inside this object are not required , you may update your phone only and never send userName here for examble and so on



export const changePasswordSchema=joi.object({
    oldPassword:joi.string().min(8).required(),
    newPassword:joi.string().min(8).not(joi.ref("oldPassword")).required(),
    confirmPassword:joi.string().min(8).valid(joi.ref("newPassword")).required(),
    //here i make validations before going to logic , is that new password should't be like old passsword and password confirmation should be the same password
    }
).required();