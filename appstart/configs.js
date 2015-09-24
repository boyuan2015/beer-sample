/**
 * Created by byuan on 9/24/2015.
 */

var _port = 3000;
var _dbip = 'localhost';
var _startTime = 0;

var Configs = function() {

}

Object.defineProperty(Configs.prototype, 'port', {
    get: function () {
        return _port;
    },
    set: function (val) {
        _port = val;
    }
});

Object.defineProperty(Configs.prototype, 'dbip', {
    get: function () {
        return _dbip;
    },
    set: function (val) {
        _dbip = val;
    }
});

Object.defineProperty(Configs.prototype, 'startTime', {
    get: function () {
    return _startTime;
    },
    set: function (val) {
    _startTime = val;
    }
});

module.exports = new Configs();

