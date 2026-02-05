import { Router } from "express";
import * as userService from './user.service.js'
import isAuthinticated from "../../Middleware/authentication.middleware.js";
import asyncHandler from './../../Utils/error handling/asyncHandler.js';
import { roles } from "../../DB/models/user.model.js";
import isAuthorized from "../../Middleware/authorization.middleware.js";
import validation from "../../Middleware/validation.middleware.js";
import { changePasswordSchema, updateProfileSchema } from "./user.validation.js";
const userRouter=Router();

//get user profile
userRouter.get("/",
asyncHandler(isAuthinticated),
isAuthorized([roles.user]),
asyncHandler(userService.profile))


//update user profile
userRouter.patch("/",
    asyncHandler(isAuthinticated),
    isAuthorized([roles.user,roles.admin]),
    validation(updateProfileSchema),
    asyncHandler(userService.updateProfile))


    //change user password
userRouter.patch("/changePassword",
    asyncHandler(isAuthinticated),
    isAuthorized([roles.user,roles.admin]),
    validation(changePasswordSchema),
    asyncHandler(userService.changePassword))



       //change user password
userRouter.patch("/deactivate",                                                        //soft delete , make is deleted =false
    asyncHandler(isAuthinticated),
    isAuthorized([roles.user,roles.admin]),
    asyncHandler(userService.deactivateAcount))

export default userRouter;