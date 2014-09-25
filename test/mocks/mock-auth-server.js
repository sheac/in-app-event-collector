module.exports = MockAuthServer;

var config = require('../../config/config'),
    MockServer = require('./mock-server');

MockAuthServer.instance = new MockServer(config.mock_auth_server_port);
MockAuthServer.instance.addGetEndpoint(
    config.auth_server_get_game_ids_url_path_part,
    function(_) { return { game_ids: MockAuthServer.mockGameIds }; },
    200);
MockAuthServer.instance.startServer();

MockAuthServer.mockGameIds = [ 'abc', 'def', 'ghi', ];

function MockAuthServer() {}

