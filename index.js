const Hapi = require('hapi');
const Good = require('good');
const articlesDb = require('./model/articlesDb');
const customCollectionsDb = require('./model/customCollections');
const blogController = require('./controllers/blog').register;
const customCollectionsController = require('./controllers/customCollection').register;
const corsHeaders = require('hapi-cors-headers');

const server = new Hapi.Server();

function loadDatabases(server) {
    articlesDb.loadDatabase().then(status => server.log('DB Loaded', status)).catch(err => server.log('error loading model', err));
    customCollectionsDb.loadDatabase().then(status => server.log('DB Loaded', status)).catch(err => server.log('error loading model', err));
}

server.connection({
    host: 'localhost',
    port: 8000
});

const blogControllerPlugin = {
    register: blogController,
    options: {},
    routes: {
        prefix: '/blog'
    }
};
const customCollectionPlugin = {
    register: customCollectionsController,
    options: {},
    routes: {}
};

const loggerPlugin = {
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
};

server.ext('onPreResponse', corsHeaders);

server.register(
    [blogControllerPlugin, customCollectionPlugin, loggerPlugin], (err) => {

        if (err) {
            throw err; // something bad happened loading the plugin
        }

        loadDatabases(server);

        server.start((err) => {

            if (err) {
                throw err;
            }
            server.log('info', 'Server running at: ' + server.info.uri);
        });
    }
);