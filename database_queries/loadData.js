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

const connection = require('./connectDatabase');

// loadTABLENAME variable is assigned [query string, filepath string]

let loadAgency = [
    `load data local infile ? into table agency
    fields terminated by ',' lines terminated by '\n' 
    ignore 1 lines 
    (
        agency_url, 
        agency_name, 
        agency_timezone, 
        agency_id, 
        agency_lang
    )`, 
    "../gtfs/agency.txt"
];


let loadCalendarDates = [
    `load data local infile ? into table calendardates
    fields terminated by ',' lines terminated by '\n' 
    ignore 1 lines
    (
        service_id,
        calendar_date,
        exception_type
    )`,
    '../gtfs/calendar_dates.txt'
];

let loadCalendar = [
    `load data local infile ? into table calendar
    fields terminated by ',' lines terminated by '\n' 
    ignore 1 lines
    (
        service_id,
        start_date,
        end_date,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
    )`,
    '../gtfs/calendar.txt'
];

let loadFareAttributes = [
    `load data local infile ? into table fareattributes
    fields terminated by ',' lines terminated by '\n' 
    ignore 1 lines
    (
        fare_id,
        price,
        currency_type,
        payment_method,
        transfers,
        transfer_duration
    )`,
    '../gtfs/fare_attributes.txt'
];

let loadFareRules = [
    `load data local infile ? into table farerules
    fields terminated by ',' lines terminated by '\n' 
    ignore 1 lines
    (
        fare_id,
        route_id,
        origin_id,
        destination_id,
        contains_id
    )`,
    '../gtfs/fare_rules.txt'
];

let loadRoutes = [
    `load data local infile ? into table routes
    fields terminated by ',' lines terminated by '\n' 
    ignore 1 lines
    (
        route_long_name,
        route_type,
        route_text_color,
        route_color,
        agency_id,
        route_id,
        route_url,
        route_desc,
        route_short_name
    )`,
    '../gtfs/routes.txt'
];

let loadShapes = [
    `load data local infile ? into table shapes
    fields terminated by ',' lines terminated by '\n' 
    ignore 1 lines
    (
        shape_id,
        shape_pt_lat,
        shape_pt_lon,
        shape_pt_sequence,
        shape_dist_traveled
    )`,
    '../gtfs/shapes.txt'
];

let loadStopTimes = [
    `load data local infile ? into table stoptimes
    fields terminated by ',' lines terminated by '\n' 
    ignore 1 lines
    (
        trip_id,
        arrival_time,
        departure_time,
        stop_id,
        stop_sequence,
        stop_headsign,
        pickup_type,
        drop_off_type,
        shape_dist_traveled,
        timepoint
    )`,
    '../gtfs/stop_times.txt'
];
let loadStops = [
    `load data local infile ? into table stops
    fields terminated by ',' lines terminated by '\n' 
    ignore 1 lines
    (
        stop_lat,
        stop_code,
        stop_lon,
        stop_url,
        stop_id,
        stop_desc,
        stop_name,
        location_type,
        zone_id
    )`,
    '../gtfs/stops.txt'
];

let loadTrips = [
    `load data local infile ? into table trips
    fields terminated by ',' lines terminated by '\n' 
    ignore 1 lines
    (
        block_id,
        route_id,
        original_trip_id,
        direction_id,
        trip_headsign,
        shape_id,
        service_id,
        trip_id
    )`,
    '../gtfs/trips.txt'
];

function loadFileDataQuery(query, filepath) {
    connection.query(query, filepath, function(err){
        if (err) {
            console.error("error connecting: " + err.stack);
            return
        }
    })
};

// SQL queries to load local file data to corresponding table
// loadFileDataQuery(loadAgency[0], loadAgency[1]);
// loadFileDataQuery(loadCalendarDates[0], loadCalendarDates[1]);
// loadFileDataQuery(loadCalendar[0], loadCalendar[1]);
// loadFileDataQuery(loadFareAttributes[0], loadFareAttributes[1]);
// loadFileDataQuery(loadFareRules[0], loadFareRules[1]);
// loadFileDataQuery(loadRoutes[0], loadRoutes[1]);
// loadFileDataQuery(loadShapes[0], loadShapes[1]);
// loadFileDataQuery(loadStopTimes[0], loadStopTimes[1]);
// loadFileDataQuery(loadStops[0], loadStops[1]);
// loadFileDataQuery(loadTrips[0], loadTrips[1]);

// Temporarily keeping this while testing out queries to quickly delete all rows
/*
connection.query('DELETE FROM agency', function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return
    }
})
*/

connection.end();

