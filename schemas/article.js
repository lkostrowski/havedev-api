const Joi = require('joi');

module.exports = {
    content: Joi.string().required(),
    lifecycle: Joi.object().keys({
        created: Joi.date().iso().required(),
        published: Joi.date().iso(),
        updated: Joi.date().iso(),
    }),
    title: Joi.string().min(3).required(),
    excerpt: Joi.string(),
    tags: Joi.array().items(Joi.object().keys({id: Joi.string(), name: Joi.string()})),
    categories: Joi.array().items(Joi.object().keys({id: Joi.string(), name: Joi.string()})),
    slug: Joi.string().required(),
    hash: Joi.string().length(4).required(),
    status: Joi.string().valid('draft', 'published').required(),
    revisions: Joi.array().items(Joi.object().keys({
        date: Joi.date().iso().required(),
        content: Joi.string().required()
    }))
};