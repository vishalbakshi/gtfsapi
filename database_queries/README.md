# database_queries

## Installation

If you're not familiar with node, you can use the SQL files with whatever local server you have running:

<a href="https://github.com/vishalbakshi/gtfsapi/blob/version2/database_queries/createTables.sql">`createTables.sql`</a>: Contains queries to create new tables (if they don't already exist)

<a href="https://github.com/vishalbakshi/gtfsapi/blob/version2/database_queries/loadData.sql">`loadData.sql`</a>: Contains queries to load data from the gtfs folder into your tables.

Otherwise, since the files in this folder require the `database.js` script, `dotenv` package and `mysql` package so please download the full repo, and `npm install`. I've used the latest version of node (11.3.0).

Once you have done that, make the following adjustments to the files:

Note: either add the following variables to your `.env` file...
```
    DB_HOST=
    DB_DATABASE=
    DB_USER=
    DB_PASSWORD=
```
...and make sure to direct `dotenv` in each file (`createTables.js` and `loadData.js`) to your environment variables filepath...

`require('dotenv').config({path: "path/to/env"})`

or add the following to the top of each file (before `connection.query(...)`), after removing `require('../database')`:

```
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'me',
    password : 'secret',
    database : 'my_db'
});

connection.connect();
```
You can run the following once your database is connected:

`node createTables.js`

Creates new tables (if they don't exist) using a schema that is right now based on the April 9th GTFS data received from the SFMTA. There are some field differences between the SFMTA GTFS feed and the <a href="https://developers.google.com/transit/gtfs/reference/"> GTFS reference </a> which are written in the comments of `createTables.js`.

`node loadData.js`

Loads the data from the GTFS `.txt` files into the appropriate tables in the database.
You must first download and unzip <a href="https://transitfeeds.com/p/sfmta/942/20190409/download">the `gtfs.zip` file</a>. Note that the filepath references in this script may need to be changed based on where your files are located.
 
