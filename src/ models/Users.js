import { DataTypes } from "sequelize";

const UsersModel = (sequelize) => {
  const User = sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("artist", "buyer"),
        allowNull: false,
        //dev
        defaultValue: "artist",
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      // New indentation
      underscored: true,
      freezeTableName: true,
      tableName: "users",
    }
  );
  return User;
};

export default UsersModel;
