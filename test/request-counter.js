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

    var numReqs = Math.ceil(Math.random() * 20),
        expected = 1;
    async.times(numReqs, function(reqIndex, next) {
        request(url, function(err, resp, body) {
            if (err) next(err);

            try {
                body = JSON.parse(body);
                parseInt(body.num_reqs).should.equal(expected);
                expected += 1;
                next();
            } catch(e) {
                next(e);
            }
        });
    },
    done);
});

