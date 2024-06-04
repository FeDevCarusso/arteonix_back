import { DataTypes } from "sequelize";

const UserProfileModel = (sequelize) => {
  const UserProfile = sequelize.define('UserProfile', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    bio: {
      type: DataTypes.TEXT,
    },
    social_links: {
      type: DataTypes.JSONB,
    },
    profile_picture: {
      type: DataTypes.STRING,
    },

  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'user_profiles',
  });
  return UserProfile;
};


export default UserProfileModel;