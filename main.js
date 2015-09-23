/**
 * Created by byuan on 9/23/2015.
 */

var couchbase = require('couchbase');

// connect to couchbase server
var cluster = new couchbase.Cluster('couchbase://localhost');
var bucket = cluster.openBucket('beer-sample', function(err) {
    if (err) {
        throw err;
    }
});

// retrieve a document
bucket.get('21st-amendment_brewery_cafe', function(err, result) {
    if (err) {
        throw err;
    }

    var doc = result.value;
    console.log(doc.name + ', ABV: ' + doc.abv);
});

//myBucket.get('21st-amendment_brewery_cafe', function(err, res) {
//    console.log('Value: ', res.value);
//});
var query = ViewQuery.from('beer-sample', 'name').skip(6).limit(3);
myBucket.query(query, function(err, results) {
    for(i in results) {
        console.log('Row:', results[i]);
    }
});

