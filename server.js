process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express'),
    winston = require('winston');

var config = require('./config/config');

var app = express();

require('./config/express')(app);
require('./src/routes')(app);
require('./src/resources/processing-params')(app);

app.listen(config.port, config.ip, function() {
    winston.info('Express server listening on %s:%d, in %s mode',
        config.ip,
        config.port,
        app.get('env'));
});

module.exports = app;
