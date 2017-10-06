const path = require('path');

module.exports = {
    dbPath: path.join(process.cwd(), 'stores'),
    uploadsPath: path.join(process.cwd(), 'upload')
};