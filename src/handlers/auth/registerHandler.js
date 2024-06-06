import { registerController } from "../../controllers/auth/registerController.js";
import response from "../../utils/functions/response.js";
import ControllerResponse from "../../utils/mvcClasses/ControllerResponse.js";

async function registerHandler(req, res) {
  try {
    const { username, email, password, role } = req.body;
    const { message, data, error, status, done } = await registerController({
      username,
      email,
      password,
      role,
    });

    return response(res, status, message, error, data, done);
  } catch (error) {
    console.error(error);
  }
}

export { registerHandler };
