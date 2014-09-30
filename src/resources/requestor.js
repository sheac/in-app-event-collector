var _ = require('lodash'),
    Bacon = require('baconjs'),
    request = require('request');

var E_REMOTE_SERVER_ERROR = 'error contacting remote server';

module.exports = {
    getJson: function(url) {
        var respStream = Bacon.fromNodeCallback(request.get, url);

        return respStream.flatMap(function(resp) {
            var statusFamily = statusCodeToFamily(resp.statusCode);

            if (statusFamily === 400 || statusFamily === 300) {
                return new Bacon.Error(new Error(config.E_INTERNAL_ERROR));

            } else if (statusFamily === 500) {
                return new Bacon.Error(new Error(E_REMOTE_SERVER_ERROR));

            } else {
                return parseIfNeeded(resp.body);
            }
        });
    },
};

function statusCodeToFamily(statusCode) {
    return Math.floor(statusCode / 100) * 100;
}

function parseIfNeeded(body) {
    if (typeof body === 'object') return body;
    return body = JSON.parse(body);
}

