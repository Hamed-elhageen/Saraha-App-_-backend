import { Router  } from "express";
import * as messageService from './message.service.js'
import asyncHandler from './../../Utils/error handling/asyncHandler.js';
import isAuthinticated from "../../Middleware/authentication.middleware.js";
import isAuthorized from "../../Middleware/authorization.middleware.js";
import { roles } from "../../DB/models/user.model.js";
import validation from "../../Middleware/validation.middleware.js";
import { getSingelMessageSchema, sendMessageSchema } from "./message.validation.js";

const messageRouter=Router();
//create message => send message
messageRouter.post("/",
    isAuthinticated,
    isAuthorized([roles.user]),
    validation(sendMessageSchema),
    asyncHandler(messageService.sendMessage))


    //get single message
messageRouter.get("/:msgId",
    isAuthinticated,
    isAuthorized([roles.user]),                                                                                                                                                   //here we pass to it the role that you tell him that he is valid to do this endpiont
    validation(getSingelMessageSchema),
    asyncHandler(messageService.getSingleMessage))


    //get all messages
messageRouter.get("/",isAuthinticated,
    isAuthorized([roles.user,roles.admin])
    ,asyncHandler(messageService.getAllMessages))

export default messageRouter;