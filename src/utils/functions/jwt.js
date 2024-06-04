
// 3rd party modules
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// config env variables
dotenv.config()

const { JWT_SECRET } = process.env

export default function generateToken(data) {
    try {
        const token = jwt.sign(data, JWT_SECRET, {
            expiresIn: '7d'
        })
        return token
    } catch (error) {

    }

}
