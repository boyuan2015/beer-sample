var MySqlSvc = require('./mysqlsvc.js');

var databaseName = 'dev_release_s01';
var query_GETALLCHARGERS = 'SELECT * FROM Charger LIMIT 6';  // LIMIT 2
var query_GETRAILS = 'SELECT * FROM Rail LIMIT 6';
var query_GETBATCHES = 'SELECT * FROM Batch LIMIT 6';

var mysql;

var TdcData = function () {
    var MySqlSvc = require('./mysqlsvc.js');
    mysql = new MySqlSvc(databaseName);
}

TdcData.prototype.getChargers = function () {
    console.log('Get charger records');
    mysql.runQuery(query_GETALLCHARGERS, getChargersCallback);
}

TdcData.prototype.getRails = function (callback) {
    console.log('Get rail records');
    mysql.runQuery(query_GETRAILS, function (err, rows) {
        var rails = [];
        if (!err) {
            for (var i = 0; i < rows.length; i++) {
                var rail = {};
                rail.key = '';
                if (rows[i].RailID) {
                    rail.key = mysql.convertToNodeID('10', 'RL', rows[i].RailID);
                }
                var value = {};
                value.type = 'rail';
                value.mac = rows[i].MAC;
                value.authorized = (rows[i].Authorized[0] == 1) ? true : false;
                rail.value = value;
                rails.push(rail);
            }
            //console.log(rails);
            var result = { value : rails };
            return callback(null, result);
        } else {
            return callback(err);
        }
    });
}

TdcData.prototype.getBatches = function () {
    console.log('Get batch records');
    mysql.runQuery(query_GETBATCHES, getBatchesCallback);
}

getBatchesCallback = function (err, rows) {
    var batches = [];
    if (!err) {
        for (var i = 0; i < rows.length; i++) {
            var batch = {};
            batch.key = '';
            if (rows[i].BatchID) {
                batch.key = mysql.convertToNodeID('10', 'BT', rows[i].BatchID);
            }
            var value = {};
            value.type = 'batch';
            value.batchType = rows[i].BatchType;
            value.batchResult = rows[i].BatchResult;
            value.startDate = rows[i].StartDate;
            value.endDate = rows[i].EndDate;
            value.supplementalInfo = rows[i].SupplementalInfo;
            batch.value = value;
            batches.push(batch);
        }
        console.log(batches);
    }
    return batches;
}

getChargersCallback = function (err, rows) {
    var chargers = [];
    if (!err) {
        for (var i = 0; i < rows.length; i++) {
            var charger = {};
            charger.key = '';
            if (rows[i].ChargerID) {
                charger.key = mysql.convertToNodeID('10', 'CH', rows[i].ChargerID);
            }
            var value = {};
            value.type = 'charger';
            value.rfid = rows[i].RFID;
            charger.value = value;
            chargers.push(charger);
        }
        console.log(chargers);
    }
    return chargers;
}

getRailsCallback = function (err, rows) {
    var rails = [];
    if (!err) {
        for (var i = 0; i < rows.length; i++) {
            var rail = {};
            rail.key = '';
            if (rows[i].RailID) {
                rail.key = mysql.convertToNodeID('10', 'RL', rows[i].RailID);
            }
            var value = {};
            value.type = 'rail';
            value.mac = rows[i].MAC;
            value.authorized = (rows[i].Authorized[0] == 1) ? true : false;
            rail.value = value;
            rails.push(rail);
        }
        console.log(rails);
    }
    return rails;
}

module.exports = TdcData;