/**
 *  (c) copyright 2015. TableSafe, Inc.  All rights reserved.
 *
 * Created by byuan on 9/23/2015.
 */

// Description


var express = require('express');
var _ = require('underscore');
var Beer = require('../models/beer');
var router = express.Router();

// function to validate input parameter
router.param(function(name, fn) {
    if (fn instanceof RegExp) {
        return function(req, res, next, val) {
            var captures;
            if (captures = fn.exec(String(val))) {
                req.params[name] = captures;
                next();
            }
        }
    }
});

// regex for parameter validation
router.param('doc', /^.+$/);

// TODO: query argument validation

router.route('/::doc')
    .get(function(req, res, next) {
        var beer = new Beer(req, res);
        beer.get(req, res. req.params.doc, function(error, result) {
        });
    });

module.exports = router;
