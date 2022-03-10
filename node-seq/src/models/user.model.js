const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const User = sequelize.define('users', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.fn('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.fn('CURRENT_TIMESTAMP')
        }
    }, {
        charset: 'utf8'
    });

    return User;
};