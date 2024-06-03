export default (sequelize) => {
  const UserProfile = sequelize.define('UserProfile', {
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: 'User',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    bio: {
      type: DataTypes.TEXT,
    },
    social_links: {
      type: DataTypes.JSONB,
    },
    profile_picture: {
      type: DataTypes.VARCHAR,
    },
    created_at: {
      type: DataTypes.TIMESTAMP,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.TIMESTAMP,
      defaultValue: DataTypes.NOW,
    },
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'user_profiles',
  });
  return UserProfile;
};
