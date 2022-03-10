const { Joi, validate } = require('express-validation');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getUserSchemaValidation = validate({
    headers: Joi.object({}).options({ allowUnknown: true }),
    body: Joi.object({}).options({ allowUnknown: false }),
    query: Joi.object({
        userId: Joi.number().required()
    }).options({ allowUnknown: false })
});

const loginValidator = validate({
    headers: Joi.object({}).options({ allowUnknown: true }),
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required().min(8)
    }).options({ allowUnknown: false }),
    query: Joi.object({}).options({ allowUnknown: false })
});

const validateAuth = (request, response, next) => {
    if (request.headers.authorization === "13efa3c6-e8b2-4c78-8d01-e3251daa68e9")
        next();
    else
        throw new Error("Validation failed, token not found");
};


const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const secret = process.env.TOKEN_SECRET;
        if (token == null) throw new Error('Token is missing');
        jwt.verify(token, secret, (err, payload) => {
            try {
                if (err) throw err;
                req.payload = payload
                next();
            } catch (error) {
                res.status(500).send(error.message);
            }
        });
    } catch (error) {
        throw error;
    }
};

module.exports = (app) => {
    const express = require('express');
    const router = express.Router({
        caseSensitive: true,
        strict: true
    });
    const userController = require('./../controller/UserController');

    console.log("userController: ", userController);

    router.get('/get-all', [getUserSchemaValidation, verifyToken], userController.getAllUserDetails);

    router.post('/login', [loginValidator], userController.login);

    // router.post('/create', userController.createUser);

    // router.delete('/delete', userController.deleteUser);

    app.use('/user', router);
};