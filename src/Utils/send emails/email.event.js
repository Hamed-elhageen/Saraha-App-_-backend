    import EventEmitter from 'events'
    import jwt from 'jsonwebtoken'
    import generateHTML from './generateHTML.js'
    import sendEmail from './sendMails.js';

    const emailEmitter= new EventEmitter();                                                                                                                                   //emailEmitter is now an event , you can use with it on and emit
    emailEmitter.on("sendEmail",async(email)=>{                                                                                                                         // here i said : when you emit the event ("sendEmail") and give it an email parameter , this function will send and email to the user , and take care all that is done outside register(done in the background) so it will be so fast in the postman
        let token = jwt.sign({email},process.env.TOKEN_KEY);                                                                                                       //a token is generated from the given email
        let link = `${process.env.PROJECT_LINK}/auth/activate_acount/${token}`                                                                       //the token is put in the link  
        let isSent = await sendEmail({to:email,subject:"Acitvate your acount",html:generateHTML(link)});                               //email is sent to the user
    })
    export default emailEmitter;



    emailEmitter.emit("Sendemail",email)

