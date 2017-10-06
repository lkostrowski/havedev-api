const MediaFilesController = require('../utils/MediaController');

const media = new MediaFilesController();

function uploadMediaHandler(request, reply) {
    const file = request.payload.file;
    const name = request.payload.name;

    media.saveFile(file, name).then(() => {
        reply({
            status: 'OK'
        }).type('application/json');
    });
}

exports.register = (plugin, options, next) => {
    plugin.route([
        {method: 'POST', path: '/media', config: {handler: uploadMediaHandler}}
    ]);

    next();
};

exports.register.attributes = {
    name: 'Media upload controller',
    version: '1.0.0'
};
