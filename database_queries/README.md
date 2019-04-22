# database_queries
This file references/uses the `database.js` script in this repo and requires the `dotenv` package.

Note: either add the following variables to your `.env` file...
```
    DB_HOST=
    DB_DATABASE=
    DB_USER=
    DB_PASSWORD=
```
...and make sure to direct `dotenv` to your environment variables filepath...

```
require('dotenv').config({path: `path/to/env`})
```
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

    - `node createTables.js`
        - Creates new tables (if they don't exist) using a schema that is right now based on the April 9th GTFS data received from the SFMTA. There are some field differences between the SFMTA GTFS feed and the <a href="https://developers.google.com/transit/gtfs/reference/"> GTFS reference which are written in the comments of `createTables.js`.

    - `node loadData.js`
        - Loads the data from the GTFS `.txt` files into the appropriate tables in the database.
        - You must first download and unzip <a href="https://transitfeeds.com/p/sfmta/942/20190409/download">the `gtfs.zip` file</a>. Note that the filepath references in this script may need to be changed based on where your files are located.
  

