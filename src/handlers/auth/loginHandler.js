// local imports

import { loginController } from "../../controllers/auth/loginController.js";
import response from "../../utils/functions/response.js";
import ControllerResponse from "../../utils/mvcClasses/ControllerResponse.js";

// Login
async function loginHandler(req, res) {
  try {
    // get user data
    const { username, password } = req.body;
    // perform login
    const { message, data, error, status, done } = await loginController({
      username,
      password,
    });

    if (!!data) {
      // set up the cookie
      res.setHeader("token", "Bearer " + data);
      res.setHeader("Content-Type", "application/json");
    }

    //return response
    return response(res, status, message, error, null, done);
  } catch (error) {
    console.error(error);
  }
}

//export
export { loginHandler };
