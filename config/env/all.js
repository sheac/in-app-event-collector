var path = require('path');

var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    root_path: rootPath,
    ip: '0.0.0.0',
    port: process.env.PORT || 9000,
};
