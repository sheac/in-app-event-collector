module.exports = ApiResponder;

var _ = require('lodash');

function ApiResponder(res) {
    this.res = res;
    this.sendSuccess = function(data) {
        this.res.status(200).send(data);
    };

    this.sendError = function(err) {
        this.res.status(500).send(err);
    };
}

