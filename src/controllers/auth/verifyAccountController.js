// local imports
import sequelize from "../../database.js"
import ControllerResponse from "../../utils/mvcClasses/ControllerResponse.js"

// models
const { Users, ConfirmationTokens } = sequelize.models

// verify account controller
export default async function verifyAccountController(token) {
    try {
        // check if token exists in the db
        const savedToken = await ConfirmationTokens.findOne({
            where: {
                token
            }
        })

        // if not, return error
        if (!savedToken) {
            return ControllerResponse.badRequest("El enlace de confirmación es inválido")
        }

        // check if user already confirmed
        const user = await Users.findByPk(savedToken.userId)

        if (user.confirmed) {
            return ControllerResponse.badRequest("El usuario ya está confirmado")
        }


        // update user confirmed status

        await user.update({
            confirmed: true
        })


        // delete token from db
        await savedToken.destroy()


        // return success message
        return ControllerResponse.success("Usuario confirmado")
    } catch (error) {
        console.error(error)
        return ControllerResponse.serverError("Error al confirmar el usuario")
    }
}