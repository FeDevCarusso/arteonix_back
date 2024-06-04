import { DataTypes } from "sequelize";

const ConfirmationTokensModel = (sequelize) => {
    const ConfirmationToken = sequelize.define('ConfirmationTokens', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },

    }, {
        underscored: true,
        freezeTableName: true,
        tableName: 'confirmation_tokens',
    });
    return ConfirmationToken;
};

export default ConfirmationTokensModel;
