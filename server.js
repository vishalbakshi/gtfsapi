require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const connection = require('./database');
const port = 3306;
const https = require('https');

// Firebase setup for NodeJS environment
const admin = require("firebase-admin");
const serviceAccount = require('./serviceAccount.json')

// unzip library
const yauzl = require('yauzl');
const fs = require('fs');

// Firebase setup for frontend scripts
// const firebase = require("firebase");
// const firebaseConfig = require('./firebaseConfig.json');
// firebase.initializeApp(firebaseConfig);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB_URL
});


// Prepare WriteStream to download transitfeeds zip file
let requestURL = process.env.TRANSITFEEDS_SFMTA_REQUEST_URL;
let downloadFile = fs.createWriteStream("./download.zip");

// GET request to transitfeeds URL will redirect to the file location
// pipe the file to WriteStream
// TODO: unzip the file using `yauzl` 

app.route('/get-gtfs-zip-file')
    .get((appReq, appRes) => {
        console.log('GET requested')
        https.get(requestURL, (res) => {
            const { statusCode } = res;
            console.log('Outside if statement')
            if (statusCode == 302) {
                console.log('Inside if statement')
                https.get(res.headers['location'], (redirectResponse) => {
                    redirectResponse.pipe(downloadFile);
                    downloadFile.on('finish', () => {
                        console.log('File downloaded!')
                        return appRes.send('success');
                    });
                })
            }
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    });



const server = app.listen(port);

module.exports = { app: app, server: server };