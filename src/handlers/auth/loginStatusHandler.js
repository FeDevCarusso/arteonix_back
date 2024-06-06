import response from "../../utils/functions/response.js";
import ControllerResponse from "../../utils/mvcClasses/ControllerResponse.js";

export default function loginStatusHandler(req, res) {
  try {
    const { message, data, error, status, done } = ControllerResponse.success(
      "Sesión activa",
      null,
      true
    );
    return response(res, status, message, error, data, done);
  } catch (error) {
    console.error(
      "Se produjo un error al devolver el estado de autenticacion del usuario"
    );
    console.error(error);
  }
}
