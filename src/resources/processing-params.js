var Bacon = require('baconjs');
var config = require('../../config/config'),
    Requestor = require('./requestor');

module.exports = function(app) {
    var jsonStream = Requestor.getJson(config.auth_server_url_base +
            config.auth_server_get_game_ids_url_path_part);
    var gameIdsStream = jsonStream.map('.game_ids');

    app.processingParams = Bacon.combineTemplate({
        game_ids: gameIdsStream,
    });

    app.processingParams.onError(function(err) {
        throw err;
    });
};

