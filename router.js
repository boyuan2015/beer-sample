/**
 *  (c) copyright 2015. TableSafe, Inc.  All rights reserved.
 *
 * Created by byuan on 9/23/2015.
 */

// Description
//    (1) Specify route for '/beers' requests
//    (2) Handle root GET request

var express = require('express');
var params = require('express-params');

var beersService = require('./controllers/bearsController');

var router = express.Router();
params.extend(router);

router.get('/', function(req, res) {
    res.send('Welcome to Beer-Sample v1 API!');
});

router.use('/beers', beersService);

module.exports = router;

