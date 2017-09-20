const Hapi = require('hapi');
const Good = require('good');
const articlesDb = require('./db/articlesDb');
const blogController = require('./controllers/blog').register;

const server = new Hapi.Server();

function loadDatabases(server) {
    articlesDb.loadDatabase().then(status => server.log('DB Loaded', status)).catch(err => server.log('error loading db', err));
}

server.connection({
    host: 'localhost',
    port: 8000,
    routes: {
        cors: true
    }
});

const blogControllerPlugin = {
    register: blogController,
    options: {

    },
    routes: {
        prefix: '/blog'
    }
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

server.register(
    [blogControllerPlugin, loggerPlugin], (err) => {

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