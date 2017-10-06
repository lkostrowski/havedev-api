const path = require('path');
const defaultConfig = require('./default');

module.exports = Object.assign({}, defaultConfig, {
    dbPath: path.join(process.cwd(), 'test', 'stores')
});