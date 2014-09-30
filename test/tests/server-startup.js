var should = require('should'),
    Bacon = require('baconjs'),
    _ = require('lodash');

var config = require('../../config/config'),
    MockAuthServer = require('../mocks/mock-auth-server');

var mockAuthServer, appServer;

before(function() {
    mockAuthServer = new MockAuthServer();
    appServer = require('../../server');
});

after(function() {
    mockAuthServer.stopInstance();
    appServer = null;
});

describe('happy path', function() {
    beforeEach(function(done) {
        mockAuthServer.restartInstance();
        appServer.restart();
        setTimeout(done, 100); // let the servers start up
    });

    it('should request the list of legal game IDs on startup', function() {
        mockAuthServer.instance.requests.length.should.equal(1);
        var gameIdReq = mockAuthServer.instance.requests[0];
        (typeof gameIdReq).should.not.equal('undefined');
        gameIdReq.url.should.equal(config.auth_server_get_game_ids_url_path_part);
        gameIdReq.method.should.equal('GET');
    });

    it('should accept and store the list of legal game IDs on startup', function() {
        var ProcessingParams = appServer.instance.processingParams;
        Bacon.once({})
            .combine(ProcessingParams, _.extend)
            .onValue(function(params) {
                params.game_ids.should.eql(MockAuthServer.mockGameIds);
            });
    });

    xit('should accept new legal game IDs and merge them with the existing list');
});

describe('error path server', function() {
    describe('when getting game ids', function() {
        beforeEach(function(done) {
            mockAuthServer.resetInstance();
            mockAuthServer.addGetEndpoint(
                function(_) { return { err: 'some error msg' }; },
                500);
            mockAuthServer.startInstance();
            appServer.restart();
            setTimeout(done, 100); // let the servers start up
        });

        it('should handle an error on the auth server', function() {
            console.log('appServer.instance exists?', !!appServer.instance);
        });
    });
});

