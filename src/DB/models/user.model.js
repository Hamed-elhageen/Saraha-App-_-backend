import mongoose from "mongoose";
export const genders={
    male:"male",
    female:"female"
}
export const roles={
    user:"user",
    admin:"admin"
}
const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:[true, "userName is required"],
        minLength:[2,"userName cant be less than 2 letters"],
        maxLength:[20,"userName cant be more than 20 letters"],
    },
    email:{
        type:String,
        required:[true, "email is required"],
        unique:[true,"email already exists"],
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"invalid email format"],
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"password should be at least 8 letters"],
    },
    phone:{
        type:String,
        required:[true,"phone is required"],
    },
    gender:{
        type:String,
        enum:Object.values(genders)        //["male","female"]
    },
    isActivated: {
    type: Boolean,
    default: false
    },
    role:{
        type:String,
        enum:Object.values(roles),
        default:roles.user
    },
    changedAt:Date
},{
    timestamps:true                                                                                  //this optional object is to add created at and updated at automatically
})

const User= mongoose.model("User",userSchema)

export default User;