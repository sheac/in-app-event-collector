var should = require('should'),
    request = require('request'),
    async = require('async');

var config = require('../config/config');

var redis = require('../src/resources/redis');

before(function(done) {
    redis.flushdb(done);
});

after(function(done) {
    redis.flushdb(done);
});

it('should count the number of requests sent', function(done) {
    var url = 'http://' + config.ip + ':' + config.port + '/requestcounter';

    async.times(5, function(n, next) {
        request(url, function(err, resp, body) {
            if (err) next(err);

            try {
                body = JSON.parse(body);
                var found = parseInt(body.num_reqs),
                    expected = n + 1;
                found.should.equal(expected);
                next();
            } catch(e) {
                next(e);
            }
        });
    },
    done);
});

