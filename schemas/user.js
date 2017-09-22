const Joi = require('joi');

module.exports = {
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    groups: Joi.array().items(Joi.string()),
};