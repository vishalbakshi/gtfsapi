require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database');
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.route('/books/:userId')
    .get(function(req, res, next){
        connection.query(
            "SELECT * FROM `books` WHERE userId = ? LIMIT 3", req.params.userId,
            function(error, results, fields) {
                if (error) throw error;
                res.json(results);
            }
        );
    });

app.get('/status', (req, res) => res.send('Working!'));

app.listen(3306);