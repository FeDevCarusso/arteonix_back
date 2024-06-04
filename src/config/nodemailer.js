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

const sendMail = async (to, username) => {
    try {
        const mailOptions = {
            from: NM_USR,
            to,
            subject: 'Welcome to Arteonix!',
            text: `Hola ${username},

                ¡Bienvenido a Arteonix! Estamos emocionados de tenerte a bordo. Por favor, verifica tu cuenta haciendo clic en el siguiente enlace:

                [Enlace de verificación]

                Una vez que hayas verificado tu cuenta, podrás acceder a todas las funciones de Arteonix.

                Gracias,
                El equipo de Arteonix`
        }

        await transporter.sendMail(mailOptions)
        console.log(`Email sent to ${to}`)

    } catch (error) {
        console.error(`Error sending mail: ${error}`)
    }
}

export { sendMail };

export default transporter