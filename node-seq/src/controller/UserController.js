const { request } = require('express');

const UserModel = require('../connection').User;


module.exports.createUser = async (request, response) => {
    try {
        const body = request.body;
        const res = await UserModel.create({
            name: body.name,
            password: body.password,
            email: body.email
        });
        return response.status(200).json(res);
    } catch (error) {
        return response.status(500).json(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    }
};

module.exports.getAllUsers = async (request, response) => {
    try {
        const users = await UserModel.findAll();
        return response.status(200).json(users);
    } catch (error) {
        return response.status(500).json(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    }
};

module.exports.getUser = async (request, response) => {
    try {
        const users = await UserModel.findOne({ where: { id: request.params.userId }, attributes: ['id', 'name', 'email'] });
        return response.status(200).json(users);
    } catch (error) {
        return response.status(500).json(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    }
};
