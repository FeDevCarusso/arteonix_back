import { config } from 'dotenv'
import nodemailer from 'nodemailer'

// Load environment variables from .env file
config()

// Access environment variables
const { NM_PASS, NM_USR } = process.env

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: NM_USR,
        pass: NM_PASS,
    },
})

const sendMail = async (to, username, token) => {
    try {
        const mailOptions = {
            from: NM_USR,
            to,
            subject: 'Welcome to Arteonix!',
            html: `<!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Bienvenido a Arteonix</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        background-color: #f9f9f9;
                    }
                    .button {
                        display: inline-block;
                        padding: 10px 20px;
                        margin-top: 20px;
                        font-size: 16px;
                        color: #ffffff;
                        background-color: #007bff;
                        text-decoration: none;
                        border-radius: 4px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <p>Hola ${username},</p>
                    <p>¡Bienvenido a <strong>Arteonix</strong>! Estamos emocionados de tenerte a bordo. Por favor, verifica tu cuenta haciendo clic en el siguiente enlace:</p>
                    <a href="http://localhost:3001/verify/${token}" class="button">Verificar cuenta</a>
                    <p>Una vez que hayas verificado tu cuenta, podrás acceder a todas las funciones de Arteonix.</p>
                    <p>Gracias,</p>
                    <p>El equipo de Arteonix</p>
                </div>
            </body>
            </html>
            `,
            text: `Hola ${username},

            ¡Bienvenido a Arteonix! Nos emociona tenerte con nosotros. Para completar tu registro, por favor verifica tu cuenta haciendo clic en el siguiente enlace:
            
            Verificar Cuenta
            
            Una vez verificada tu cuenta, tendrás acceso completo a todas las funciones de Arteonix.
            
            Gracias por unirte,
            El equipo de Arteonix`,
        }

        await transporter.sendMail(mailOptions)
        console.log(`Email sent to ${to}`)

    } catch (error) {
        console.error(`Error sending mail: ${error}`)
    }
}

export { sendMail };

export default transporter