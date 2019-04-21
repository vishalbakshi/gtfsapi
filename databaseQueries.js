require('dotenv').config();

// const express = require('express');
// const app = express();

// const port = 3306;
// const https = require('https');
const connection = require('./database');

let createAgencyTable = `create table if not exists agency(
    agency_id char(5) primary key,
    agency_name varchar(45),
    agency_url varchar(17),
    agency_timezone varchar(19),
    agency_lang varchar(12)
)`;

let createStopsTable = `create table if not exists stops(
    stop_id varchar(4),
    stop_code vachar(5),
    stop_name varchar(100),
    stop_desc varchar(100),
    stop_lat float(8,6),
    stop_lon float(9,6),
    zone_id varchar(100),
    stop_url varchar(100),
    location_type int,
    parent_station varchar(4),
    stop_timezone varchar(100),
    location_type int,
    platform_code varchar(100)
)`;

let createRoutesTable = `create table if not exists routes(
    route_id varchar(5),
    agency_id varchar(5),
    route_short_name varchar(5),
    route_long_name varchar(100),
    route_desc varchar(100),
    route_type int,
    route_url varchar(100),
    route_color varchar(100),
    route_sort_order int
)`;

let createTripsTable = `create table if not exists trips(
    route_id foreign key,
    service_id foreign key,
    trip_id,
    trip_headsign,
    trip_short_name,
    direction_id,
    block_id,
    shape_id,
    wheelchair_accessible,
    bikes_allowed
)`;

let createStopTimesTable = `create table if not exists stoptimes(
    trip_id foreign key,
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

let createCalendarTable = `create table if not exists calendar(
    service_id primary key,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    start_date,
    end_date
)`;

let createCalendarDatesTable = `create table if not exists calendardates(
    service_id primary key,
    calendar_date date,
    exception_type
)`;

let createFareAttributesTable = `create table if not exists fareattributes(
    fare_id primary key,
    price,
    currency_type,
    payment_method,
    transfers,
    agency_id: foreign key,
    transfer_duration
)`;

let createFareRulesTable = `create table if not exists farerules(
    fare_id foreign key,
    route_id,
    origin_id,
    destination_id,
    contains_id
)`;

let createShapesTable = `create table if not exists shapes(
    shape_id primary key,
    shape_pt_lat,
    shape_pt_lon,
    shape_pt_sequence,
    shape_dist_traveled
)`;

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

function sendQuery(query) {
    connection.query(query, function(err, rows, fields){
        if (err) {
            console.error("error connecting: " + err.stack);
            return
        }
    
        console.log(rows)
    })
}

connection.end()
// const server = app.listen(port);

// module.exports = { app: app, server: server };