import { Router } from "express";
import * as authService from './auth.service.js'
import validation from "../../Middleware/validation.middleware.js";
import * as authSchemas from './auth.validation.js'
import asyncHandler from "../../Utils/error handling/asyncHandler.js";
const authRouter=Router();
authRouter.post("/register",validation(authSchemas.registerSchema),asyncHandler(authService.register))
authRouter.post("/login",validation(authSchemas.loginSchema),asyncHandler(authService.login))
authRouter.get("/activate_acount/:token",asyncHandler(authService.activateAcount))

export default authRouter;