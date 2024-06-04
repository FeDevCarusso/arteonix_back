// local imports
import validateSchema from "../utils/validators/validations.js";
import ControllerResponse from "../utils/mvcClasses/ControllerResponse.js";

// validator middleware
function validatorMiddleware(authSchema, req, res, next) {
    try {

        // validate schema
        const { errors } = validateSchema(authSchema, req.body);

        // if errors
        if (errors?.length) {

            // parse errors
            const parseErrors = errors.map(err => ({ path: err.path, message: err.message }))

            // send response
            const response = ControllerResponse.badRequest("Hay errores en los campos", parseErrors)
            return res.status(response.status).json({ message: response.message, error: response.error })

        } else {

            // next middleware
            next()
        }


    } catch (error) {

        // send error response
        const errorResponse = ControllerResponse.error("Se produjo un error durante la validación", error);
        console.error(error)
        return res.status(errorResponse.status).json({ message: errorResponse.message, error: errorResponse.error })
    }
}
// export
export default validatorMiddleware
