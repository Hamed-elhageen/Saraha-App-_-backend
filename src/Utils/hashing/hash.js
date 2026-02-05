import bcrypt from 'bcrypt'
export const hash=({text,rounds=Number(process.env.ROUNDS)})=>{
    return bcrypt.hashSync(text,rounds)
}


export const compare=({text,hashedText})=>{
    return bcrypt.compareSync(text,hashedText)
}