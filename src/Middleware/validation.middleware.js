//this will be a middleware which will be put before the logic of the end points which will give me a data to validate on based on a built schema , (this function or middleware when you use it , you give it the schema as a parameter (login schema or register schema and it will validate on the data given against this schema))
export const validation=(schema)=>{
    return(req,res,next)=>{
        let data={...req.body,...req.params,...req.query};
        let result =schema.validate(data,{abortEarly:false});
        if(result.error){
            let messages=result.error.details.map((obj)=>obj.message)
            return next(new Error (messages),{cause:400})
        }
        return next();
    }
}

export default validation;
