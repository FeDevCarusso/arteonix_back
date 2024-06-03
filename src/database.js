import { config } from "dotenv";
import { Sequelize } from "sequelize";


//env variables
config()

//sequelize instance
const sequelize = new Sequelize()

export default sequelize