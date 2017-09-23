const articlesModel = require('../db/articlesDb');
const articleSchema = require('../schemas/article');

function getArticlesHandler(request, reply) {
    const published = request.query.published;
    async function getArticles() {
        return await articlesModel.getArticles({published});
    }

    const articles = getArticles();

    return reply(articles).type('application/json');

}

function addArticleHandler(request, reply) {
    articlesModel.insertArticle(request.payload).then(doc => {
        console.log('Article added: ' + doc._id);

        reply('ok').status(200); //return it?
    }).catch(err => {
        reply(403);
    });
}

function getArticle(request, reply) {
    const slug = request.params.hash;

    articlesModel.getArticle(slug)
        .then(doc => {
            reply(doc);
        })
        .catch(err => {
            console.log(err)
        });

}

exports.register = (plugin, options, next) => {
    plugin.route([
        {method: 'GET', path: '/articles', config: {handler: getArticlesHandler}},
        {method: 'GET', path: '/article/{hash}', config: {handler: getArticle}},
        {
            method: 'POST',
            path: '/article',
            config: {
                handler: addArticleHandler,
                payload: {parse: true, output: 'data'},
                validate: {
                    payload: articleSchema
                }
            }
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'Blog controller',
    version: '1.0.0'
};
