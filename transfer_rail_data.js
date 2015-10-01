var Q = require('q');
var TdcData = require('./tdcdata');
var tdcdata = new TdcData();

const host = 'localhost';
const port = '8091';
const railBucketName = 'rail';

var CouchbaseService = require('./couchdbsvc');
var cs = new CouchbaseService(host, port);


//var a = cs.openBucket('rail', function (err, result) {
//    console.log(result.value);
//});

//var b = tdcdata.getRails(function (err, result) {
//    if (err) {
//        console.log('fail to get rails');
//    } else {
//        console.log(result.value);
//    }
//});

var openRailBucketAsync = Q.nbind(cs.openBucket);
var getRailsAsync = Q.nbind(tdcdata.getRails);

var railvalue;
var railbucketdata;

getRailsAsync()
.then(function (result) {
    console.log(result.value);
    railvalue = result.value;
})
.catch(function (err) {
    console.log(err.message);
});
