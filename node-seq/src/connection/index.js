const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize({
    host: "localhost",
    username: "root",
    password: "",
    database: "sequelize_db",
    dialect: "mysql",
    logging: true,
    logQueryParameters: true
});

const User = require('./../models/user.model')(sequelize);

module.exports = { sequelize, User };

