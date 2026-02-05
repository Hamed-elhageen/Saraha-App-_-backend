import connectDB from "./DB/connection.js";
import authRouter from "./Modules/auth/auth.controller.js";
import userRouter from "./Modules/user/user.controller.js";
import globalErrorHandler from "./Utils/error handling/global error handler.js";
import messageRouter from "./Modules/message/message.controller.js";
import cors from 'cors'
const bootstrap=async(app,express)=>{
    await connectDB();
    app.use(express.json());
    app.use(cors())
    app.use("/auth",authRouter)
    app.use("/user",userRouter)
    app.use("/message",messageRouter)
    app.use((req,res,next)=>{
        return next(new Error("Path not found ",{cause:404}))
    })
    //global error handler , if you add anything inside next() it will come here in error
    app.use(globalErrorHandler)
}

export default bootstrap;