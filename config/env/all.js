var path = require('path');

var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    root_path: rootPath,
    ip: '0.0.0.0',
    port: process.env.PORT || 9000,
    auth_server_get_game_ids_url_path_part: '/games/tokens/',

    E_REMOTE_SERVER_ERROR: 'error contacting remote server',
};
