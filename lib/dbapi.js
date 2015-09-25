/**
 * Created by byuan on 9/24/2015.
 */

var debug = require('debug')('dbapi');
var couchbase = require('couchbase');
var HashMap = require('hashmap');

var _host;
var _cluster;
var _bucketsMap = new HashMap();

var DbApi = function (host) {
    this.setHost(host);
}

DbApi.prototype.closeBuckets = function() {
    _bucketsMap.forEach(function (value, key) {
       value.disconnect();
    });
    _bucketsMap.clear();
}

DbApi.prototype.getBucket = function(bucketName) {
    var thisBucket = _bucketsMap.get(bucketName);
    if (!thisBucket) {
        thisBucket = this.openBucket(bucketName);
    }
    return thisBucket;
};

DbApi.prototype.getDocument = function(bucket, key, callback) {
    bucket.get('' + key, function(error, result) {
        if (error) {
            return callback(error);
        } else {
            return callback(null, result);
        }
    });
};

DbApi.prototype.getHost = function () {
    return _host;
};

DbApi.prototype.openBucket = function (bucketName) {
    var thisBucket = null;
    if (bucketName) {
        if (_bucketsMap.get(bucketName) == null) {
            thisBucket = _cluster.openBucket(bucketName);
            if (thisBucket) {
                _bucketsMap.set(bucketName, thisBucket);
                debug('Connected to bucket ' + bucketName);
            } else {
                debug('Failed to open the bucket ' + bucketName);
            }
        }
    } else {
        debug('invalid bucketName');
    }
    return thisBucket;
};

DbApi.prototype.setHost = function (host) {
    if (host) {
        if (host != _host) {
            if (_cluster) {
                this.closeBuckets();
            }
            _host = host;
            _cluster = new couchbase.Cluster('couchbase://' + host);
            debug('Setting cluster to couchbase:// ' + host);
        }
    } else {
        debug('invalid host');
    }
    return host;
}

module.exports = DbApi;