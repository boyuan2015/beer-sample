var debug = require('debug')('couchdbsvc');
var couchbase = require('couchbase');
var HashMap = require('hashmap');

const username = 'Administrator';
const password = 'boyuan2015!CE';

var _host; // e.g., 'localhost'
var _port = '';
var _cluster;
var _clusterManager;
var _bucketsMap = new HashMap();

var CouchDbSvc = function (host) {
    this.sethost(host);
}

CouchDbSvc.prototype.sethost = function (host, port) {
    if (host) {
        if (host != _host) {
            if (_cluster) {
                this.closeBuckets();
            }
            _host = host;
            var portString = '';
            if (port) {
                _port = port;
                portString = ':' + port;
            }
            _cluster = new couchbase.Cluster('couchbase://' + host + portString);
            _clusterManager = _cluster.manager(username, password);
            debug('Setting cluster to couchbase:// ' + host);
        }
    } else {
        debug('invalid host');
    }
    return host;
}

//----------------------------------------------
// Bucket/Bucket Collection API
//----------------------------------------------
CouchDbSvc.prototype.CloseBuckets = function () {
    _bucketsMap.forEach(function (value, key) {
        value.disconnect();
    });
    _bucketsMap.clear();
}

// NOTE : tested, works.
CouchDbSvc.prototype.getBuckets = function () {
    _clusterManager.listBuckets(function (err, data) {
        console.log('bucket list : ');
        console.log(data);
    });
}

// NOTE : tested, works.
CouchDbSvc.prototype.createBucket = function (bucketName, callback) {
    if (bucketName) {
        _clusterManager.createBucket(bucketName, null, function (err, data) {
            if (err) {
                debug('Failed to create the bucket ' + bucketName);
                debug(err);
                return callback(err, null);
            } else {
                debug('Created the new bucket ' + bucketName);
                var result = { value : data };
                return callback(null, result);
            }
        });
    } else {
        debug('invalid bucketName');
    }
}

// NOTE : tested, works.
CouchDbSvc.prototype.openBucket = function (bucketName, callback) {
    var thisBucket = null;
    if (bucketName) {
        thisBucket = _bucketsMap.get(bucketName);
        if (thisBucket == null) {
            thisBucket = _cluster.openBucket(bucketName);
            if (thisBucket) {
                _bucketsMap.set(bucketName, thisBucket);
                debug('Connected to bucket ' + bucketName);
                var result = { value : thisBucket };
                return callback(null, result);
            } else {
                debug('Failed to open the bucket ' + bucketName);
            }
        } else {
            var result = { value : thisBucket }; 
            return callback(null, result);
        }
    } else {
        debug('invalid bucketName');
    }
};

// NOTE: tested, works.
CouchDbSvc.prototype.removeBucket = function (bucketName, callback) {
    if (bucketName) {
        _clusterManager.removeBucket(bucketName, function (err, data) {
            if (err) {
                debug('Failed to delete the bucket ' + bucketName);
                debug(err);
                return callback(err, null);
            } else {
                debug('Successfully deleted the bucket ' + bucketName);
                var result = { value : data };
                return callback(null, result);
            }
        });
    } else {
        debug('invalid bucketName');
    }
}

//----------------------------------------------
// Bucket/Bucket Collection API
//----------------------------------------------
//CouchDbSvc.prototype.insertDocument(bucket, key, value, callback) {
//    bucket.insert('' + key, value, function (err, data) {
//        if (error) {
//            return callback(error);
//        }
//        result.value = key;
//        return callback(null, result);
//    });
//}

module.exports = CouchDbSvc;