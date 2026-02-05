const isAuthorized=(roles)=>{                                                                                             //this takes me an array of roles that is accessible to make the endpoint , and it must return a middleware to be used in the chain
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new Error("You are not Authorized!",{cause:401}))
        }
        return next()                                                                                                                 //dont forget this to go to the next logic
    }
}
export default isAuthorized