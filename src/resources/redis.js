var redis = require('redis');
var config = require('../../config/config');

var client = client || redis.createClient(),
    initialized = initialized || false,
    initializing = initializing || false;

if (shouldInitialize()) {
    signalInitStart();
    client.select(config.redis_db,
        signalInitEnd);
}

function shouldInitialize() {
    return !initialized && !initializing;
}

function signalInitStart() {
    initializing = true;
}

function signalInitEnd(err) {
    initializing = false;
    initialized = !err;
    if (err) throw err;
}


module.exports = client;
