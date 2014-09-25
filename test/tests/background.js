var should = require('should'),
    Bacon = require('baconjs'),
    _ = require('lodash');

var config = require('../../config/config'),
    MockAuthServer = require('../mocks/mock-auth-server'),
    AppServer = require('../../server');

it('should request the list of legal game IDs on startup', function(done) {
    setTimeout(function enoughTimeForServerToInit() {

        var gameIdReq = MockAuthServer.instance.requests[0];
        (typeof gameIdReq).should.not.equal('undefined');
        gameIdReq.url.should.equal(config.auth_server_get_game_ids_url_path_part);
        gameIdReq.method.should.equal('GET');
        done();

    }, 10);
});

it('should accept and store the list of legal game IDs on startup', function(done) {
    setTimeout(function enoughTimeForServerToInit() {

        var ProcessingParams = AppServer.processingParams;
        Bacon.once({})
            .combine(ProcessingParams, _.extend)
            .onValue(function(params) {
                params.game_ids.should.eql(MockAuthServer.mockGameIds);
            });
        done();

    }, 10);
});

xit('should handle an error on the auth server');

xit('should accept new legal game IDs and merge them with the existing list');

