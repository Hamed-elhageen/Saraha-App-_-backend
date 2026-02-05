const generateHTML=(link)=>{
    return `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Activate Your Account</title>
    </head>

    <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center" style="padding: 30px 0;">
                    
                    <table width="100%" max-width="500px" cellpadding="0" cellspacing="0"
                        style="background:#ffffff; padding:25px; border-radius:8px;">
                        
                        <tr>
                            <td align="center">
                                <h2 style="color:#333;">
                                    Welcome to Saraha App 👋
                                </h2>
                            </td>
                        </tr>

                        <tr>
                            <td style="color:#555; font-size:14px; line-height:1.6; padding:15px 0;">
                                Thank you for registering.
                                <br />
                                Please click the button below to activate your account.
                            </td>
                        </tr>

                        <tr>
                            <td align="center" style="padding:20px 0;">
                                <a
                                    href=${link}
                                    style="
                                        background:#2c9808;
                                        color:#ffffff;
                                        padding:12px 25px;
                                        text-decoration:none;
                                        border-radius:5px;
                                        font-weight:bold;
                                        display:inline-block;
                                    "
                                >
                                    Activate Account
                                </a>
                            </td>
                        </tr>

                        <tr>
                            <td style="color:#999; font-size:12px; text-align:center; padding-top:15px;">
                                If you didn’t create this account, you can safely ignore this email.
                            </td>
                        </tr>

                    </table>

                </td>
            </tr>
        </table>
    </body>
</html>
`
}


export default generateHTML;