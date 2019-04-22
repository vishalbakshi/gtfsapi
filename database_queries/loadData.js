require('dotenv').config({path: '../.env'});
// require `dotenv` in order to access database credentials
// from .env file
/* 
    DB_HOST=
    DB_DATABASE=
    DB_USER=
    DB_PASSWORD=
 
Can alternatively connect to database following this example:

    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'me',
        password : 'secret',
        database : 'my_db'
    });

    connection.connect();
*/

const connection = require('../connectDatabase');

// loadTABLENAME variable is assigned [query string, filepath string]
let loadAgency = ["load data local infile ? into table agency (agency_url, agency_name, agency_timezone, agency_id, agency_lang)", "../download/agency.txt"];
let loadCalendarDates;
let loadCalendar;
let loadFareAttributes;
let loadFareRules;
let loadRoutes;
let loadShapes;
let loadStopTimes;
let loadStops;
let loadTrips;

function loadFileDataQuery(query, filepath) {
    connection.query(query, filepath, function(err){
        if (err) {
            console.error("error connecting: " + err.stack);
            return
        }
    })
};

loadFileDataQuery(loadAgency[0], loadAgency[1]);

connection.end();

