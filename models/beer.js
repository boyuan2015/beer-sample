/**
 * Created by byuan on 9/24/2015.
 */

var host = 'localhost'
var TdcDbSvr = require('../lib/tdcdb_svr');
var dbsvr = new TdcDbService(host);

function Beer(req, res) {

}

Beer.prototype.get = function(req, res, id, callback) {
    dbsvr.getObject(req, res, id, function(error, result) {
        dbsvr.completeRequest(req, res, error, _.omit(result, 'cas'), function(error, result) {
            _.extend(this, result);
            return callback(error, result);
        });
    })
};

module.exports = Beer;
