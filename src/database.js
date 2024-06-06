import { config } from "dotenv";
import { Sequelize } from "sequelize";
import UsersModel from "./ models/Users.js";
import UserProfileModel from "./ models/User_Profiles.js";
import TokensBlacklistModel from "./ models/TokensBlacklist.js";
import ConfirmationTokensModel from "./ models/ConfirmationTokens.js";

//env variables
config();
const { DB_URL } = process.env;

//sequelize instance
const sequelize = new Sequelize(DB_URL, {
  dialect: "postgres",
  logging: false,
  retry: {
    match: [/Deadlock/i, Sequelize.ConnectionError], // Retry on connection errors
    max: 3, // Maximum retry 3 times
    backoffBase: 3000, // Initial backoff duration in ms. Default: 100,
    backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
  },
  pool: {
    max: 2, // Máximo de 3 conexiones simultáneas
    idle: 100, // Tiempo de espera en milisegundos antes de cerrar una conexión inactiva (100 ms)
    acquire: 3000, // Tiempo máximo en milisegundos para adquirir una conexión antes de lanzar un error (12 segundos)
    // Otros parámetros del pool
  },
  //   dialectOptions: {
  //     ssl: {
  //       require: true,
  //       rejectUnauthorized: false,
  //     },
  //   },
});

UsersModel(sequelize);
UserProfileModel(sequelize);
TokensBlacklistModel(sequelize);
ConfirmationTokensModel(sequelize);

const { Users, UserProfile, ConfirmationTokens } = sequelize.models;

//associations
Users.hasOne(UserProfile);
Users.hasMany(ConfirmationTokens);
ConfirmationTokens.belongsTo(Users);
UserProfile.belongsTo(Users);

export { Users, UserProfile };

export default sequelize;
