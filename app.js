/*
 * var TdcData = require('./tdcdata');
var tdcdata = new TdcData();

tdcdata.getChargers();
tdcdata.getRails();
tdcdata.getBatches();
*/
const host = 'localhost';
const port = '8091';
const railBucketName = 'rail';

var CouchbaseService = require('./couchdbsvc');
var cs = new CouchbaseService(host, port);
//cs.getBuckets();
//cs.openBucket('beer-sample', function (err, result) {
//    console.log(result.value);
//});
//cs.createBucket(railBucketName, function (err, result) {
//    if (!err) {
//        console.log(result.value);
//    }
//});
//cs.removeBucket('gamesim-sample', function (err, result) {
//    if (!err) {
//        console.log(result.value);
//    }
//});
//cs.openBucket('rail', function (err, result) {
//    console.log(result.value);
//});