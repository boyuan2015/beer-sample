/**
 * Created by byuan on 9/24/2015.
 */


module.exports = {
    objectGet: function(bucket, key, callback) {
        bucket.get('' + key, function(error, result) {
           if (error) {
               return callback(error);
           }
            return callback(null, result);
        });
    }
}