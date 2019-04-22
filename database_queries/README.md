# database_queries
This file references/uses the `database.js` script in this repo and requires the `dotenv` package.

Note: either add the following variables to your `.env` file...
```
    DB_HOST=
    DB_DATABASE=
    DB_USER=
    DB_PASSWORD=
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
You can run the queries once your database is connected.

`node createTables.js`
    - Creates new tables (if they don't exist) using a schema that is right now based on the GTFS data received from the SFMTA. There are some difference between the SFMTA GTFS feed and the <a href="https://developers.google.com/transit/gtfs/reference/"> GTFS reference which are written in the comments of `createTables.js`.

`node loadData.js`
    - Loads the data from the GTFS `.txt` files into the appropriate tables in the database.
    - You must first download and unzip <a href="https://transitfeeds.com/p/sfmta/942/20190409/download">the `gtfs.zip` file</a>. The filepath references in this script may need to be changed.

