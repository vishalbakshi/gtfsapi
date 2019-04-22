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

let createAgencyTable = `create table if not exists agency(
    agency_id char(5) primary key,
    agency_name varchar(45),
    agency_url varchar(17),
    agency_timezone varchar(19),
    agency_lang varchar(12)
)`;

let createStopsTable = `create table if not exists stops(
    stop_id varchar(4) primary key,
    stop_code varchar(5),
    stop_name varchar(100),
    stop_desc varchar(100),
    stop_lat float(8,6),
    stop_lon float(9,6),
    zone_id varchar(100),
    stop_url varchar(100),
    parent_station varchar(4),
    stop_timezone varchar(100),
    location_type int,
    platform_code varchar(100)
)`;

let createRoutesTable = `create table if not exists routes(
    route_id varchar(5) primary key,
    agency_id varchar(5),
    route_short_name varchar(5),
    route_long_name varchar(100),
    route_desc varchar(100),
    route_type int,
    route_url varchar(100),
    route_color varchar(100),
    route_sort_order int
)`;

// SFMTA trips.txt does not contain the following fields:
// trip_short_name
// wheelchair_accessible
// bikes_allowed
//
// SFMTA trips.txt contains the following fields not listed in:
// https://developers.google.com/transit/gtfs/reference/#tripstxt
// original_trip_id
let createTripsTable = `create table if not exists trips(
    trip_id varchar(22) primary key,
    route_id varchar(5),
    foreign key (route_id)
    references routes(route_id),
    service_id varchar(16),
    foreign key (service_id)
    references calendar(service_id),
    trip_headsign varchar(50),
    direction_id int(1),
    block_id varchar(6),
    shape_id varchar(21),
    foreign key (shape_id)
    references shapes(shape_id),
    original_trip_id varchar(7)
)`;

// SFMTA GTFS folder does not contain the following table: 
// stoptimes.txt file
/*
let createStopTimesTable = `create table if not exists stoptimes(
    foreign key (trip_id) references trips(trip_id) ,
    arrival_time,
    departure_time,
    stop_id foreign key,
    stop_sequence,
    stop_headsign,
    pickup_type,
    drop_off_type,
    shape_dist_traveled,
    timepoint
)`
*/


let createCalendarTable = `create table if not exists calendar(
    service_id varchar(16) primary key ,
    monday int(1),
    tuesday int(1),
    wednesday int(1),
    thursday int(1),
    friday int(1),
    saturday int(1),
    sunday int(1),
    start_date date,
    end_date date
)`;

let createCalendarDatesTable = `create table if not exists calendardates(
    service_id varchar(16) primary key,
    calendar_date date,
    exception_type int(1)
)`;


// SFMTA fare_attributes.txt does not contain the following fields:
// agency_id
let createFareAttributesTable = `create table if not exists fareattributes(
    fare_id int(1) primary key,
    price float(4,2),
    currency_type varchar(3),
    payment_method int(1),
    transfers int(1),
    transfer_duration int(5)
)`;

let createFareRulesTable = `create table if not exists farerules(
    id int primary key auto_increment,
    fare_id int(1),
    route_id varchar(5),
    origin_id varchar(100),
    destination_id varchar(100),
    contains_id varchar(100),
    foreign key (fare_id)
    references fareattributes(fare_id),
    foreign key (route_id)
    references routes(route_id)
)`;

let createShapesTable = `create table if not exists shapes(
    shape_id varchar(21) primary key,
    shape_pt_lat float(8,6),
    shape_pt_lon float(9,6),
    shape_pt_sequence int(2),
    shape_dist_traveled float(6,1)
)`;

// SFMTA GTFS folder does not contain the following tables: 
// frequencies.txt file
// transfers.txt file
// feedinfo.txt file

/*
let createFrequenciesTable = `create table if not exists frequencies(
    trip_id foreign key,
    start_time time,
    end_time time,
    headway_secs,
    exact_times
)`;

let createTransfersTable = `create table if not exists transfers(
    from_stop_id foreign key,
    to_stop_id foreign key
    transfer_type,
    min_transfer_time
)`;

let createFeedInfoTable = `create table if not exists feedinfo(
    feed_publisher_name,
    feed_publisher_url,
    feed_lang,
    feed_start_date date,
    feed_end_date date,
    feed_version,
    feed_contact_email,
    feed_contact_url
)`;
*/



function sendQuery(query) {
    connection.query(query, function(err, rows, fields){
        if (err) {
            console.error("error connecting: " + err.stack);
            return
        }
    })
}


connection.end();