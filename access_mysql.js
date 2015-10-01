/*
var mysql = require('mysql');

var hosturl = 'dbmaster01.lab.tsafe.systems';
var userName = 'byuan';
var secret = 'boyuan2015!ML';
var databaseName = 'dev_release_s01';
var queryString1 = 'SELECT * FROM BaseStation LIMIT 2';
var queryString2 = 'CALL BaseStations_All()';
var queryString = queryString1;

console.log('start the application');

var con = mysql.createConnection({
    host: hosturl,
    user: userName,
    password: secret,
    database: databaseName
});

con.connect(function (err) {
    if (err) {
        console.log('Error connecting to database' + err);
        return;
    }
    console.log('Connection established');
});

console.log('query database');
con.query(queryString, function (err, rows) {
    if (err) throw err;
    console.log(rows);
});

con.end(function (err) {
    console.log('callback inside the end connection');
});

//process.exit(0);
*/

var databaseName = 'dev_release_s01';
var queryString1 = 'SELECT * FROM BaseStation LIMIT 2';
var queryString2 = 'SELECT * FROM Charger LIMIT 2';

var MySqlSvc = require('./mysqlsvc.js');
var mysql = new MySqlSvc(databaseName);

/*
mysql.runQuery(queryString1, function (err, rows) {
    if (!err) {
        //console.log(rows);
        for (var i = 0; i < rows.length; i++) {
            console.log('Record ' + i);
            if (rows[i].BaseStationID) {
                console.log(mysql.convertToNodeID('10', 'BS', rows[i].BaseStationID));
            }
            if (rows[i].CompanyID) {
                console.log(mysql.convertToNodeID('10', 'RT', rows[i].CompanyID));
            }
        }
    }
});
*/


mysql.runQuery(queryString2, function (err, rows) {
    if (!err) {
        //console.log(rows);
        for (var i = 0; i < rows.length; i++) {
            console.log('Record ' + i);
            var charger = {};
            charger.key = '';
            if (rows[i].ChargerID) {
                charger.key = mysql.convertToNodeID('10', 'CH', rows[i].ChargerID);
            }
            var value = {};
            value.type = 'charger';
            value.rfid = rows[i].RFID;
            charger.value = value;
            console.log(charger);
        }
    }
});


/*
 * var couchbase = require("couchbase");

// Connect to Couchbase Server

var cluster = new couchbase.Cluster('127.0.0.1:8091');
var bucket = cluster.openBucket('beer-sample', function (err) {
    if (err) {
        // Failed to make a connection to the Couchbase cluster.
        throw err;
    }
    
    // Retrieve a document
    
    bucket.get('aass_brewery-juleol', function (err, result) {
        if (err) {
            // Failed to retrieve key
            throw err;
        }
        
        var doc = result.value;
        
        console.log(doc.name + ', ABV: ' + doc.abv);
        
        // Store a document
        
        doc.comment = "Random beer from Norway";
        
        bucket.replace('aass_brewery-juleol', doc, function (err, result) {
            if (err) {
                // Failed to replace key
                throw err;
            }
            
            console.log(result);
            
            // Success!
            process.exit(0);
        });
    });
});
 * 