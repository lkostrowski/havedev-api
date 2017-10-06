const collectionsModel = require('../model/customCollections');
const collectionSchema = require('../schemas/customCollection');

function getArticlesHandler(request, reply) {
    async function getCollections() {
        return await collectionsModel.getCustomCollections();
    }

    const articles = getCollections();

    return reply(articles).type('application/json');

}

function addCollectionHandler(request, reply) {
    collectionsModel.addCustomCollection(request.payload).then(doc => {
        return reply('ok').status(200); //return it?
    }).catch(err => {
        reply(403);
    });
}

function getCollection(request, reply) {
    const name = request.params.name;

    collectionsModel.getCollection(name)
        .then(doc => {
            reply(doc);
        })
        .catch(err => {
            console.log(err)
        });
}

exports.register = (plugin, options, next) => {
    plugin.route([
        {method: 'GET', path: '/custom-collection', config: {handler: getArticlesHandler}},
        {method: 'GET', path: '/custom-collection/{name}', config: {handler: getCollection}},
        {
            method: 'POST',
            path: '/custom-collection',
            config: {
                handler: addCollectionHandler,
                payload: {parse: true, output: 'data'},
                validate: {
                    payload: collectionSchema
                }
            }
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'Custom collections controller',
    version: '1.0.0'
};
