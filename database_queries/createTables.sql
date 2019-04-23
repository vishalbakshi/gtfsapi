CREATE TABLE IF NOT EXISTS agency(
    agency_id CHAR(5) PRIMARY KEY,
    agency_name VARCHAR(45),
    agency_url VARCHAR(17),
    agency_timezone VARCHAR(19),
    agency_lang VARCHAR(12)
);

CREATE TABLE IF NOT EXISTS stops(
    stop_id VARCHAR(4) PRIMARY KEY,
    stop_code VARCHAR(5),
    stop_name VARCHAR(100),
    stop_desc VARCHAR(100),
    stop_lat FLOAT(8,6),
    stop_lon FLOAT(9,6),
    zone_id VARCHAR(100),
    stop_url VARCHAR(100),
    parent_station VARCHAR(4),
    stop_timezone VARCHAR(100),
    location_type INT,
    platform_code VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS routes(
    route_id VARCHAR(5) PRIMARY KEY,
    agency_id VARCHAR(5),
    route_short_name VARCHAR(5),
    route_long_name VARCHAR(100),
    route_desc VARCHAR(100),
    route_type INT,
    route_url VARCHAR(100),
    route_color VARCHAR(100),
    route_text_color VARCHAR(100),
    route_sort_order INT
);

CREATE TABLE IF NOT EXISTS trips(
    trip_id VARCHAR(22) PRIMARY KEY,
    route_id VARCHAR(5),
    FOREIGN KEY (route_id)
    REFERENCES routes(route_id),
    service_id VARCHAR(16),
    FOREIGN KEY (service_id)
    REFERENCES calendar(service_id),
    trip_headsign VARCHAR(50),
    direction_id INT(1),
    block_id VARCHAR(6),
    shape_id VARCHAR(21),
    FOREIGN KEY (shape_id)
    REFERENCES shapes(shape_id),
    original_trip_id VARCHAR(7)
);

CREATE TABLE IF NOT EXISTS stopTIMEs(
    trip_id VARCHAR(22) PRIMARY KEY,
    arrival_TIME TIME,
    departure_TIME TIME,
    stop_id VARCHAR(4),
    stop_sequence INT,
    stop_headsign VARCHAR(100),
    pickup_type INT(1),
    drop_off_type INT(1),
    shape_dist_traveled FLOAT,
    TIMEpoINT INT(1)
);

CREATE TABLE IF NOT EXISTS calendar(
    service_id VARCHAR(16) PRIMARY KEY,
    monday INT(1),
    tuesday INT(1),
    wednesday INT(1),
    thursday INT(1),
    friday INT(1),
    saturday INT(1),
    sunday INT(1),
    start_DATE DATE,
    end_DATE DATE
);

CREATE TABLE IF NOT EXISTS calendarDATEs(
    service_id VARCHAR(16) PRIMARY KEY,
    calendar_DATE DATE,
    exception_type INT(1)
);

CREATE TABLE IF NOT EXISTS fareattributes(
    fare_id INT(1) PRIMARY KEY,
    price FLOAT(4,2),
    currency_type VARCHAR(3),
    payment_method INT(1),
    transfers INT(1),
    transfer_duration INT(5)
);

CREATE TABLE IF NOT EXISTS farerules(
    fare_rules_id INT not null PRIMARY KEY auto_increment,
    fare_id INT(1),
    route_id VARCHAR(5),
    origin_id VARCHAR(100),
    destination_id VARCHAR(100),
    contains_id VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS shapes(
    shape_id VARCHAR(21) PRIMARY KEY,
    shape_pt_lat FLOAT(8,6),
    shape_pt_lon FLOAT(9,6),
    shape_pt_sequence INT(2),
    shape_dist_traveled FLOAT(6,1)
);