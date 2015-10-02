var Q = require('q');
var TdcData = require('./tdcdata');
var tdcdata = new TdcData();

const host = 'localhost';
const port = '8091';
const railBucketName = 'rail';

var CouchbaseService = require('./couchdbsvc');
var cs = new CouchbaseService(host, port);

//var openRailBucketAsync = Q.nbind(cs.openBucket);
//var getRailsAsync = Q.nbind(tdcdata.getRails);
//var insertDocumentAsync = Q.nbind(cs.insertDocument);

/*
Q.all([openRailBucketAsync('rail'), getRailsAsync()])
.done(function (values) {
    var railBucket = values[0].value;
    var rails = values[1].value;
    console.log('rail bucket');
    console.log(railBucket);
    console.log('total rail records ' + rails.length);
    console.log(rails);
}, function (errors) {
});
*/

// insert a document test
//cs.openBucket('rail', function (error, result) {
//    if (!error) {
//        var railBucket = result.value;
//        var key = '123456789';
//        var value = {
//            type : 'rail',
//            mac : 'aa:bb:cc:dd:ee:ff',
//            authorized : true
//        };
//        cs.insertDocument(railBucket, key, value, function (error, result) {
//            if (error) {
//                console.log(error);
//            } else {
//                console.log('add the document successfully');
//                console.log('key = ' + result.value);
//            }
//        });
//    }
//});

// get a document test
//cs.openBucket('rail', function (error, result) {
//    if (!error) {
//        var railBucket = result.value;
//        var key = '123456789';
//        //var value;
//        cs.getDocument(railBucket, key, function (error, result) {
//            if (error) {
//                console.log(error);
//            } else {
//                // The returned result data is ...
//                //{ cas: CouchbaseCas<71171004369172>,
//                //  value: { type: 'rail', mac: 'aa:bb:cc:dd:ee:ff', authorized: true } }
//                console.log('get the document successfully');
//                console.log(result);
//            }
//        });
//    }
//});

// delete a document test
//cs.openBucket('rail', function (error, result) {
//    if (!error) {
//        var railBucket = result.value;
//        var key = '123456789';
//        cs.deleteDocument(railBucket, key, function (error, result) {
//            if (error) {
//                console.log(error);
//            } else {
//                // The returned result data is ...
//                // { cas: CouchbaseCas<72128765042297108> }
//                console.log('delete the document successfully');
//                console.log(result);
//            }
//        });
//    }
//});

// transfer mysql rail data to couchbase rail bucket test
var openRailBucketAsync = Q.nbind(cs.openBucket);
var getRailsAsync = Q.nbind(tdcdata.getRails);
//var insertDocumentAsync = Q.nbind(cs.insertDocument);


Q.all([openRailBucketAsync('rail'), getRailsAsync()])
.done(function (values) {
    var railBucket = values[0].value;
    var rails = values[1].value;
    console.log('rail bucket');
    console.log(railBucket);
    console.log('total rail records ' + rails.length);
    // returned single rail record
    //{ key: '10RL00000001',
    //value: { type: 'rail', mac: 'bf:bf:bf:bf:bf:bf', authorized: true } }
    //console.log(rails[0]);
    //console.log(rails);
    for (var i = 0; i < rails.length; i++) {
        cs.insertDocument(railBucket, rails[i].key, rails[i].value, function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log('add the document successfully');
                console.log('key = ' + result.value);
            }
        });
    }
}, function (errors) {
});
