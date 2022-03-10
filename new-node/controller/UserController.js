require('dotenv').config();
const handler = require('./../handler');
const connection = require('./../connection').connection;
const knex = require('./../connection').knex;
const jwt = require('jsonwebtoken');

module.exports = new class UserController {

    // async getAllUserDetails(request, response) {
    //     try {
    //         console.log("query param: ", request.query);
    //         const userId = request.query.userId;
    //         const query = `SELECT id as userId, name as name, email as mail FROM user WHERE deleted = ? AND id = ?`;
    //         console.log({ query });
    //         connection.query(query, [0, userId], (error, result, fields) => {
    //             try {
    //                 if (error) throw error;
    //                 response.status(200).json(handler.success(result));
    //             } catch (error) {
    //                 response.status(322).json(handler.error(error));
    //             }
    //         });
    //     } catch (error) {
    //         response.status(500).json(handler.error(error));
    //     }
    // }

    async getAllUserDetails(request, response) {
        try {
            console.log("query param: ", request.query);
            const userId = Number(request.query.userId);
            const sql = knex.from('user').where('deleted', '=', 0).select('id', 'name', 'email', 'phone', 'address').andWhere('id', userId);
            console.log("knex query: ", sql.toString());
            const result = await sql;
            return response.status(200).json(handler.success(result));
        } catch (error) {
            return response.status(500).json(handler.error(error));
        }
    }


    async login(request, response) {
        try {
            const username = request.body.username;
            const password = request.body.password;
            const result = await knex.select('id', 'name', 'email', 'phone', 'address').from('user').where('name', username).andWhere('password', password).andWhere('deleted', 0);
            if (result?.length) {
                const payload = result[result.length - 1];
                const token = await new UserController().generateToken(payload);
                return response.status(200).json(handler.success({ ...payload, token }));
            } else {
                throw new Error("Username and password do not match");
            }
        } catch (error) {
            console.log(error);
            return response.status(500).json(handler.error(error));
        }
    }


    async generateToken(payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const tokenSecret = process.env.TOKEN_SECRET;
                const expiryTime = process.env.TOKEN_LIFE;
                const token = await jwt.sign(payload, tokenSecret, { expiresIn: expiryTime });
                resolve(token);
            } catch (error) {
                reject(error);
            }
        });
    }
}