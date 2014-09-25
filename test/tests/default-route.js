var should = require('should'),
    request = require('request');

var config = require('../../config/config');

it('should have a working endpoint', function(done) {
    var url = 'http://' + config.ip + ':' + config.port;
    request(url, function(err, resp, body) {
        if (err) done(err);
        body.should.equal('Awesome request GREAT JOB');
        done();
    });
});

