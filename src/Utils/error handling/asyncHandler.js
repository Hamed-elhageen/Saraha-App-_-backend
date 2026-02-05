const asyncHandler=(fn)=>{
return (req,res,next)=>{
    try{
    fn(req,res,next);
    }catch(error){
        return next(new Error(error))
    }
}
}

export default asyncHandler;