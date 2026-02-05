import cryptojs from 'crypto-js'

export const encrypt = ({text,secretKey=process.env.ENCRYPTION_SECRET})=>{
    return cryptojs.AES.encrypt(text,secretKey).toString();
}

export const decrypt = ({encryptedText,secretKey=process.env.ENCRYPTION_SECRET})=>{
    return cryptojs.AES.decrypt(encryptedText,secretKey).toString(cryptojs.enc.Utf8);
}