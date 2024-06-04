import { config } from "dotenv";
import { Sequelize } from "sequelize";
import UsersModel from './ models/Users.js'
import UserProfileModel from './ models/User_Profiles.js'
import TokensBlacklistModel from "./ models/TokensBlacklist.js";
import ConfirmationTokensModel from "./ models/ConfirmationTokens.js";

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
TokensBlacklistModel(sequelize)
ConfirmationTokensModel(sequelize)

const { Users, UserProfile, ConfirmationTokens } = sequelize.models

//associations
Users.hasOne(UserProfile)
Users.hasMany(ConfirmationTokens)
ConfirmationTokens.belongsTo(Users)
UserProfile.belongsTo(Users)

export { Users, UserProfile }


export default sequelize