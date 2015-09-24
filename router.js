/**
 * Created by byuan on 9/24/2015.
 */
var express = require('express');
var params = require('express-params');

//var beers = require('./controllers/bearController');

var router = express.Router();
params.extend(router);

//router.use('/beers', beers);

router.get('/', function(req, res) {
    res.send('Welcome to Beer-Sample v1 API!');
});

module.exports = router;

