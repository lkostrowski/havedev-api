const fs = require('fs');
const path = require('path');
const config = require('config');
const promisify = require('util').promisify;
const logger = require('pino')();

const writeFile = promisify(fs.writeFile);

class MediaController {
    saveFile(file, name, opts = {}) {
        const filePath = path.join(config.get('uploadsPath'), name);
        return writeFile(filePath, file)
            .then(logger.info(name + ' saved'))
            .catch(err => {
                logger.error(err);
            });
    }
}

module.exports = MediaController;