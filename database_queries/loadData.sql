LOAD DATA LOCAL INFILE "../gtfs/agency.txt" INTO TABLE agency
    FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' 
    IGNORE 1 LINES 
    (
        agency_url, 
        agency_name, 
        agency_timezone, 
        agency_id, 
        agency_lang
    );


LOAD DATA LOCAL INFILE "../gtfs/calendar_dates.txt" INTO TABLE calendardates
    FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' 
    IGNORE 1 LINES
    (
        service_id,
        calendar_date,
        exception_type
    );


LOAD DATA LOCAL INFILE "../gtfs/calendar.txt" INTO TABLE calendar
    FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' 
    IGNORE 1 LINES
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
    );


LOAD DATA LOCAL INFILE "../gtfs/fare_attributes.txt" INTO TABLE fareattributes
    FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' 
    IGNORE 1 LINES
    (
        fare_id,
        price,
        currency_type,
        payment_method,
        transfers,
        transfer_duration
    );

LOAD DATA LOCAL INFILE "../gtfs/fare_rules.txt" INTO TABLE farerules
    FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' 
    IGNORE 1 LINES
    (
        fare_id,
        route_id,
        origin_id,
        destination_id,
        contains_id
    );


LOAD DATA LOCAL INFILE "../gtfs/routes.txt" INTO TABLE routes
    FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' 
    IGNORE 1 LINES
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
    );

LOAD DATA LOCAL INFILE "../gtfs/shapes.txt" INTO TABLE shapes
    FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' 
    IGNORE 1 LINES
    (
        shape_id,
        shape_pt_lat,
        shape_pt_lon,
        shape_pt_sequence,
        shape_dist_traveled
    );

LOAD DATA LOCAL INFILE "../gtfs/stop_times.txt" INTO TABLE stoptimes
    FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' 
    IGNORE 1 LINES
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
    );

LOAD DATA LOCAL INFILE "../gtfs/stops.txt" INTO TABLE stops
    FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' 
    IGNORE 1 LINES
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
    );

LOAD DATA LOCAL INFILE "../gtfs/trips.txt" INTO TABLE trips
    FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' 
    IGNORE 1 LINES
    (
        block_id,
        route_id,
        original_trip_id,
        direction_id,
        trip_headsign,
        shape_id,
        service_id,
        trip_id
    );