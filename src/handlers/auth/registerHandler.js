import { registerController } from "../../controllers/auth/registerController.js"
import response from "../../utils/functions/response.js"
import ControllerResponse from "../../utils/mvcClasses/ControllerResponse.js"

async function registerHandler(req, res) {
    try {
        const { username, email, password, role } = req.body
        const { message, data, error, status } = await registerController({ username, email, password, role })

        return response(res, status, message, error, data)

    } catch (error) {
        console.error(error)
    }
}

export { registerHandler }