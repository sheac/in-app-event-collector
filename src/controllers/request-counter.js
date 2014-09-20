module.exports = RequestCounter;

var redis = require('../resources/redis'),
    ApiResponder = require('../resources/api-responder');

var NUM_REQS_KEY = 'NUM_REQS';

RequestCounter.get = function(req, res) {
    redis.incr(NUM_REQS_KEY, function(err, newVal) {
        var apiResponder = new ApiResponder(res);
        if (err) {
            apiResponder.sendError(err);
        } else {
            var data = { num_reqs: newVal };
            apiResponder.sendSuccess(data);
        }
    });
};

function RequestCounter() {}
