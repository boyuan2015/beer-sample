var mysql = require('mysql');

var hosturl = 'dbmaster01.lab.tsafe.systems';
var userName = 'byuan';
var secret = 'boyuan2015!ML';

//var databaseName = 'dev_release_s01';
var dbConnection;

var MySqlSvc = function (databaseName) {
    console.log('Start MySQL node.js service');

    dbConnection = mysql.createConnection({
        host: hosturl,
        user: userName,
        password: secret,
        database: databaseName
    });

    dbConnection.connect(function (err) {
        if (err) {
            console.log('Error: fail to connect to the database ' + databaseName);
            console.log('Reason: ' + err);
            return;
        }
        console.log('Connected to the database successfully');
    });
};

MySqlSvc.prototype.runQuery = function (query, callback) {
    dbConnection.query(query, function (err, rows) {
        if (err) {
            console.log('Error: fail to run the query');
            console.log('Reason: ' + err);
            return callback(err, null);
        } else {
            return callback(null, rows);
        }
    });
};

MySqlSvc.prototype.convertToNodeID = function (site, type, number) {
    var id = '00000000' + number;
    return site + type + id.slice(-8);
};

module.exports = MySqlSvc;
