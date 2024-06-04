// 3rd party imports
import sequelize from "../../database.js";
import ControllerResponse from "../../utils/mvcClasses/ControllerResponse.js";

const { TokensBlacklist } = sequelize.models;

export default async function logoutController(token) {
    const transaction = await sequelize.transaction()
    try {
        await TokensBlacklist.create({ token, transaction });
        return ControllerResponse.success("Cerraste sesión")
    } catch (error) {
        await transaction.rollback()
        console.log("Se produjo un error al cerrar la sesión de un usuario")
        console.error(error)
        return ControllerResponse.error("Se produjo un error al cerrar la sesión de un usuario")
    }
}