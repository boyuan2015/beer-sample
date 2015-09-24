/**
 * Created by byuan on 9/24/2015.
 */

var express = require('express');
var _ = require('underscore');
var router = express.Router();

var Beer = require('beer');

// TODO: query argument validation

router.route('/::doc')
    .get()
