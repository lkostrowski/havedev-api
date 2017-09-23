const Joi = require('joi');

module.exports = {
    content: Joi.string().required(),
    published: Joi.date().iso().required(),
    title: Joi.string().min(3).required(),
    excerpt: Joi.string(),
    tags: Joi.array().items(Joi.object().keys({id: Joi.string(), name: Joi.string()})),
    categories: Joi.array().items(Joi.object().keys({id: Joi.string(), name: Joi.string()})),
    slug: Joi.string().required(),
    hash: Joi.string().length(4).required(),
    status: Joi.string().valid('draft', 'published').required()
};