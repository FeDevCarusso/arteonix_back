import verifyAccountController from "../../controllers/auth/verifyAccountController.js";
import response from "../../utils/functions/response.js";

export default async function verifyAccountHandler(req, res, next) {
    try {
        const { token } = req.params
        const { message, data, error, status } = await verifyAccountController(token)
        response(res, status, message, error, data)
    } catch (error) {
        console.error(error)
    }
}