import joi from 'joi'
import {genders} from '../../DB/models/user.model.js'
//register schema .. schema and rules for data which will come in the register endpoint .        (validation on backend)
export const registerSchema=joi.object({
    userName:joi.string().min(2).max(20).required(),
    email:joi.string().email().required(),
    password:joi.string().min(8).required(),
    confirmPassword:joi.string().required().valid(joi.ref("password")),
    gender:joi.string().valid(...(Object.values(genders))),
    phone:joi.string().required()
}).required();



//login schema , for data which will come in the login enpoint , and take care if there are any extra things added it will give the front end error in post man
export const loginSchema=joi.object(
    {
        email:joi.string().required().email(),
        password:joi.string().min(8).required()
    }
).required()