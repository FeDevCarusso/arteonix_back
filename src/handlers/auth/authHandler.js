import { registerController } from "../../controllers/auth/registerController.js"
import ControllerResponse from "../../utils/mvcClasses/ControllerResponse.js"

async function registerHandler(req, res) {
    try {
        const { username, email, password, role } = req.body
        const { message, data, error, status } = await registerController({ username, email, password, role })

        return res.status(status).json({ message, data, error })

    } catch (error) {

    }
}

export { registerHandler }