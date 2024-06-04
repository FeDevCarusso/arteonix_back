// local imports

import { loginController } from "../../controllers/auth/loginController.js"
import response from "../../utils/functions/response.js"
import ControllerResponse from "../../utils/mvcClasses/ControllerResponse.js"

// Login
async function loginHandler(req, res) {
    try {
        const { username, password } = req.body
        const { message, data, error, status } = await loginController({ username, password })
        return response(res, status, message, error, data)

    } catch (error) {

    }
}

//export
export { loginHandler }