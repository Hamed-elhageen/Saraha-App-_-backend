//here on production i used only brevo to send emails , since railway cant send emails , gmail consider it un safe , so  we used brevo to send email on railway
import brevo from '@getbrevo/brevo'


const {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys
} = brevo

const brevoClient = new TransactionalEmailsApi()

if (!process.env.BREVO_API_KEY) {
  throw new Error('BREVO_API_KEY is missing')
}

if (!process.env.MAIL_FROM) {
  throw new Error('MAIL_FROM is missing')
}

brevoClient.setApiKey(
  TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
)

const sendEmail = async ({ to, subject, html }) => {
  try {
    const message = {
      sender: {
        name: 'Saraha App',
        email: process.env.MAIL_FROM
      },
      to: [{ email: to }],
      subject,
      htmlContent: html
    }

    const result = await brevoClient.sendTransacEmail(message)

    if (!result?.body?.messageId) {
      throw new Error('Email not accepted by Brevo')
    }

    return true
  } catch (error) {
    console.error(
      '❌ Email send failed:',
      error.response?.body || error.message
    )
    return false
  }
}

export default sendEmail
