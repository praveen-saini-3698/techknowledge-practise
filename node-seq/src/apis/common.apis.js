const { Joi, validate } = require('express-validation');

const getUserSchema = validate({
    headers: Joi.object({}).options({ allowUnknown: true }),
    body: Joi.object({}).options({ allowUnknown: false }),
    query: Joi.object({
        userId: Joi.number()
    }).options({ allowUnknown: false }),
});


const getSingleUserSchema = validate({
    headers: Joi.object({}).options({ allowUnknown: true }),
    body: Joi.object({}).options({ allowUnknown: false }),
    query: Joi.object().options({ allowUnknown: false }),
    params: Joi.object({
        userId: Joi.number().required()
    }).options({ allowUnknown: false })
});

const createUserSchema = validate({
    headers: Joi.object({}).options({ allowUnknown: true }),
    body: Joi.object({
        name: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required()
    }).options({ allowUnknown: false }),
    query: Joi.object({}).options({ allowUnknown: false }),
});

module.exports = (app) => {
    const express = require('express');
    const router = express.Router({
        caseSensitive: true,
        strict: true
    });

    const userController = require('./../controller/UserController');

    console.log("userController: ", userController);

    router.get('/get-all', [getUserSchema], userController.getAllUsers);


    router.get('/:userId', [getSingleUserSchema], userController.getUser);

    router.post('/create', [createUserSchema], userController.createUser);

    // router.post('/create', userController.createUser);

    // router.delete('/delete', userController.deleteUser);

    app.use('/user', router);
};