import { DataTypes } from 'sequelize';

const UsersModel = (sequelize) => {
  const User = sequelize.define('Users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM('artist', 'buyer'),
      allowNull: false,
    },

  }, {
    // New indentation
    underscored: true,
    freezeTableName: true,
    tableName: 'users',
  });
  return User;
};

export default UsersModel;