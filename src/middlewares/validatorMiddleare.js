import validateSchema from "../utils/validators/validations.js";
import ControllerResponse from "../utils/mvcClasses/ControllerResponse.js";
async function validatorMiddleware(authSchema, req, res, next) {
    try {
        const { errors } = await validateSchema(authSchema, req.body);
        if (errors.length) {
            const parseErrors = errors.map(err => ({ path: err.path, message: err.message }))
            const response = ControllerResponse.badRequest("Hay errores en los campos", parseErrors)
            return res.status(response.status).json({ message: response.message, error: response.error })
        } else {
            next()
        }
    } catch (error) {
        const errorResponse = ControllerResponse.error("Se produjo un error durante la validación", error);
        return res.status(errorResponse.status).json({ message: errorResponse.message, error: errorResponse.error })
    }
}
export default validatorMiddleware