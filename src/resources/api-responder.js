module.exports = ApiResponder;

var _ = require('lodash');

function ApiResponder() {}

ApiResponder.respond = function(res, stream, redCode) {
    stream.onValue(_.bind(res.send, res.status(typeof retCode === 'number' ? retCode : 200)));
    stream.onError(_.bind(res.send, res.status(500)));
};

