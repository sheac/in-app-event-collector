module.exports = MockAuthServer;

var config = require('../../config/config'),
    MockServer = require('./mock-server');

function MockAuthServer() {
    this.restartInstance();
}

MockAuthServer.prototype.restartInstance = function() {
    this.resetInstance();
    this.addGetEndpoint(function(_) { return { game_ids: MockAuthServer.mockGameIds }; });
    this.startInstance();
};

MockAuthServer.prototype.resetInstance = function() {
    if (this.instance) this.instance.stopServer();
    this.instance = new MockServer(config.mock_auth_server_port);
};

MockAuthServer.prototype.addGetEndpoint = function(responseFunc, statusCode) {
    if (statusCode === undefined || statusCode === null) statusCode = 200;
    this.instance.addGetEndpoint(
        config.auth_server_get_game_ids_url_path_part,
        responseFunc,
        statusCode);
};

MockAuthServer.prototype.startInstance = function() {
    this.instance.startServer();
};

MockAuthServer.prototype.stopInstance = function() {
    this.instance.stopServer();
};

MockAuthServer.mockGameIds = [ 'abc', 'def', 'ghi', ];

