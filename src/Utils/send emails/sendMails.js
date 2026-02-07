// # when my project was local on my device , for gmail : my device is secure , so it send emails with no problems  , but when the project become on railway , gmail refuse that any outer server send email for security , so on railway i will use brevo which is allowed to send emials, i will send email to him and he will send it to the user
import brevo from '@getbrevo/brevo'

const {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys
} = brevo

// init brevo client مرة واحدة
const brevoClient = new TransactionalEmailsApi()

brevoClient.setApiKey(
  TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
)

const sendEmail = async ({ to, subject, html }) => {
  try {
    const message = {
      sender: {
        name: 'Saraha App',
        email: process.env.MAIL_FROM // verified sender
      },
      to: [{ email: to }],
      subject,
      htmlContent: html
    }

    const result = await brevoClient.sendTransacEmail(message)

    // لو وصل هنا → الإيميل اتبعت
    return true
  } catch (error) {
    console.error(
      '❌ Email send failed:',
      error.response?.body || error
    )
    return false
  }
}

export default sendEmail
