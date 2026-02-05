import nodemailer from 'nodemailer'
const sendEmail=async({to,subject,html})=>{
    const transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    })
const info=await transporter.sendMail({
    from:`Saraha app <${process.env.EMAIL}>`,
    to,
    subject,
    html
})
return info.rejected.length==0?true:false;                                            //that means that if it returns true , that means that the email has been sent
}
export default sendEmail;