import logoutController from "../../controllers/auth/logoutController.js";
import response from "../../utils/functions/response.js";

export default async function logoutHandler(req, res) {
    try {
        const token = req.headers?.authorization?.split(" ")[1] ?? null;
        const { message, data, error, status } = await logoutController(token)
        response(res, status, message, error, data)

    } catch (error) {
        console.error(error)
        response(res, 500, "Internal Server Error")

    }

}