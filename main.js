/**
 *  (c) copyright 2015. TableSafe, Inc.  All rights reserved.
 *
 * Created by byuan on 9/23/2015.
 */

var debug = require('debug')('beer-sample');
var express = require('express');
var bodyParser = require('body-parser');
var configs = require('./appstart/configs');

var argv = require('minimist')(process.argv.slice(2));

var app = express();

// use bodyParser to parse json
app.use(bodyParser.json());

// use bodyParser to parse URL UTF-8 encoded body
app.use(bodyParser.urlencoded({
    extended: true
}));

// specify default error handler
app.use(errorHandler);

function errorHandler(err, req, res, next) {
    res.status(err.status).json(err);
}

var router = require('./router');
app.use('/', router);

app.set('port', configs.port);

var server = app.listen(app.get('port'), function() {
    configs.startTime = new Date();
    debug('beer-Sample server listening on port ' + server.address().port);
});


