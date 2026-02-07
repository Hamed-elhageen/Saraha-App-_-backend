// # when my project was local on my device , for gmail : my device is secure , so it send emails with no problems  , but when the project become on railway , gmail refuse that any outer server send email for security , so on railway i will use brevo which is allowed to send emials, i will send email to him and he will send it to the user
import nodemailer from 'nodemailer'
const sendEmail=async({to,subject,html})=>{
    const transporter=nodemailer.createTransport({
        host:'smtp-relay.brevo.com',
        port:587,
        secure:false,
        requireTLS: true,
        auth:{
            user:process.env.BREVO_EMAIL,
            pass:process.env.BREVO_SMTP_KEY
        },
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 10000,
        socketTimeout: 10000
    })
const info=await transporter.sendMail({
    from:`Saraha app <${process.env.BREVO_EMAIL}>`,
    to,
    subject,
    html
})
return info.rejected.length==0?true:false;                                            //that means that if it returns true , that means that the email has been sent
}
export default sendEmail;