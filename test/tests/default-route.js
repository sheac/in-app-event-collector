var should = require('should'),
    request = require('request');

var config = require('../../config/config'),
    MockAuthServer = require('../mocks/mock-auth-server');

var mockAuthServer, appServer;

beforeEach(function(done) {
    mockAuthServer = new MockAuthServer(),
    appServer = require('../../server');
    setTimeout(done, 100); // let the servers start up
});

afterEach(function() {
    mockAuthServer.stopInstance();
    appServer = null;
});

it('should have a working endpoint', function(done) {
    var url = 'http://' + config.ip + ':' + config.port;
    request(url, function(err, resp, body) {
        if (err) done(err);
        body.should.equal('Awesome request GREAT JOB');
        done();
    });
});

