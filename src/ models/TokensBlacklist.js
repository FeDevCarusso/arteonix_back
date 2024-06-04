import { DataTypes } from "sequelize";
const TokensBlacklistModel = (sequelize) => {
    const TokensBlacklist = sequelize.define('TokensBlacklist', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

    }, {
        underscored: true,
        freezeTableName: true,
        tableName: 'tokens_blacklist',
    });
    return TokensBlacklist;
};


export default TokensBlacklistModel