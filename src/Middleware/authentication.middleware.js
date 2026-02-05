import User from '../DB/models/user.model.js';
import jwt from 'jsonwebtoken'
//this is a middleware to be but before the logic , and it will be used in multipe places , so due to never redunduncy we put it here and will use it where we want 
const isAuthinticated=async(req,res,next)=>{
        let {authorization}=req.headers;                                                              //now you have the token here in Authorization variable as       Bearer <token>
        if(!authorization ){
            return  next(new Error("token is required"),{cause:400})
        }
        if(!authorization.startsWith("Bearer")){
            return next(new Error("invalid token format"),{cause:400})
        }
        let token=authorization.split(" ")[1]
        let {id}=jwt.verify(token,process.env.TOKEN_KEY);                      //we used verify function which takes the token and returns the id and email you used to create it , now you have the id from the token use it to find the user easily

        let user=await User.findById(id).select("-password").lean()
        if(!user){
            return  next(new Error("user not found"),{cause:404})
        }

        //for checking if the acount is deactivated , tell him to go to login and it will be activated
        if(!user.isActivated){
            return  next(new Error("acount is deactivated , please login to activate it"),{cause:403})
        }


        //for checking on token validity and if the user changed password .. if the user first logged in and all is good and have a token , and after it he changes password , here i am checking if i changed the password in a time after creating the token , tell him to login again 
        const encoded=jwt.verify(token,process.env.TOKEN_KEY); 
        if(user.changedAt?.getTime() >= encoded.iat*1000){
            return next(new Error("password was changed ,please login again",{cause:401}))
        }


                                                                                                              //now the user is found and all is good , give it to the req object to access on it in the next stages
        req.user=user;                                                                               //to access the user in the logic function that will be executed after this middleware
        return next();                                                                              //if all is good(the user is authinticated) go and execute the next function
}

export default isAuthinticated;
//now , this middleware can be used in any place before any logic to check if the user is authintcated or not , (separated)