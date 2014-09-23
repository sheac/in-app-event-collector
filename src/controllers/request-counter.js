module.exports = RequestCounter;

var Bacon = require('baconjs'),
    _ = require('lodash');

var redis = require('../resources/redis'),
    ApiResponder = require('../resources/api-responder');

var NUM_REQS_KEY = 'NUM_REQS';

RequestCounter.get = function(req, res) {
    var newNum = Bacon.fromNodeCallback(_.bind(redis.incr, redis), NUM_REQS_KEY).toProperty(),
        data = Bacon.combineTemplate({ num_reqs: newNum });
    ApiResponder.respond(res, data);
};

function RequestCounter() {}
