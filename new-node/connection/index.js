const mysql = require('mysql2');
require('dotenv').config();
const env = process.env.NODE_ENV || 'dev';
const config = require(`./../config/${env}.json`);

const connection = mysql.createConnection({
    host: config.MYSQL.HOST,
    port: config.MYSQL.PORT,
    user: config.MYSQL.USER,
    password: config.MYSQL.PASSWORD,
    database: config.MYSQL.DATABASE
});

const knex = require('knex')({
    client: config.MYSQL.DIALECT,
    connection: {
        host: config.MYSQL.HOST,
        port: config.MYSQL.PORT,
        user: config.MYSQL.USER,
        password: config.MYSQL.PASSWORD,
        database: config.MYSQL.DATABASE
    }
});

module.exports = { connection, knex };
