require('dotenv').config();

const express = require('express');
const app = express();

const port = 3306;
// const https = require('https');
const connection = require('./database');


connection.end()
const server = app.listen(port);

module.exports = { app: app, server: server };