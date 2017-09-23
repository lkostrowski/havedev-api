const Joi = require('joi');

module.exports = {
    name: Joi.string().required(),
    fields: Joi.array().items(Joi.object().keys({
        name: Joi.string().required(),
        type: Joi.string().required(), // input, select, checkbox ?
    }))
};