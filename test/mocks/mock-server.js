module.exports = MockServer;

var winston = require('winston');

var express = require('express'),
    bodyParser = require('body-parser')

function MockServer(port) {
    this.port = port
    this.requests = [];
    this.server;
    this.app = express();
    this.app.use(bodyParser.json());
};

MockServer.prototype.addPostEndpoint = function(endpoint, reqToResp, statusCode) {
    this.addEndpoint('post', endpoint, reqToResp, statusCode);
};

MockServer.prototype.addGetEndpoint = function(endpoint, reqToResp, statusCode) {
    this.addEndpoint('get', endpoint, reqToResp, statusCode);
};

MockServer.prototype.addEndpoint = function(method, endpoint, reqToResp, statusCode) {
    var self = this;
    this.app[method](endpoint, function(req, res) {
        var respToSend = reqToResp(req);
        self.logRequest(req, respToSend);
        if (statusCode) res.status(statusCode);
        res.send(respToSend);
    });
};

MockServer.prototype.startServer = function() {
    var self = this;
    this.server = this.app.listen(this.port, function() {
        winston.info('Mock server listening on port:', self.port);
    });
};

MockServer.prototype.stopServer = function() {
    this.server.close();
};

MockServer.prototype.logRequest = function(req, resp) {
    this.requests.push({
        url: req.url,
        body: req.body,
        params: req.params,
        headers: req.headers,
        query: req.query,
        method: req.method,
        resp: resp,
    });
};

