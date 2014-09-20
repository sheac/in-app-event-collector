var requestCounterController = require('./controllers/request-counter');

module.exports = function(app) {
    app.get('/requestcounter', requestCounterController.get);

    app.get('/', function(req, res) {
        res
        .status(200)
        .send('Awesome request GREAT JOB');
    });
};
