import { config } from "dotenv";
import { Sequelize } from "sequelize";
import UsersModel from './ models/Users.js'
import UserProfileModel from './ models/User_Profiles.js'

//env variables
config()
const { DB_URL } = process.env

//sequelize instance
const sequelize = new Sequelize(DB_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
})

UsersModel(sequelize)
UserProfileModel(sequelize)

const { Users, UserProfile } = sequelize.models

Users.hasOne(UserProfile)
UserProfile.belongsTo(Users)

export { Users, UserProfile }

export default sequelize