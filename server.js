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
const { Storage } = require('@google-cloud/storage')
const storage = new Storage();
const bucketName = 'gtfs-bucket'
// unzip library
const yauzl = require('yauzl');
const fs = require('fs');

// Firebase setup for frontend scripts
// const firebase = require("firebase");
// const firebaseConfig = require('./firebaseConfig.json');
// firebase.initializeApp(firebaseConfig);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB_URL,
    storageBucket: "gtfs-api-a9548.appspot.com"
});

// const bucket = admin.storage().bucket();

// Prepare WriteStream to download transitfeeds zip file
let requestURL = process.env.TRANSITFEEDS_SFMTA_REQUEST_URL;
let downloadFile = fs.createWriteStream("./download.zip");

// GET request to transitfeeds URL will redirect to the file location
// and pipe the file to WriteStream

// TODO: upload the file to firebase storage
// TODO: unzip the file using `yauzl` 
// TODO: Insert the file contents to Cloud SQL
// TODO: Query Cloud SQL and send query results as response

app.route('/get-gtfs-zip-file')
    // I've differentiated the request and response objects between 
    // the app's GET route, the first GET request and the second GET request
    .get((appReq, appRes) => {

        https.get(requestURL, (res) => {
            const { statusCode } = res;
            // Transitfeeds download URL will redirect to the zip file's location
            // This server should do the same
            if (statusCode == 302) {
                https.get(res.headers['location'], (redirectResponse) => {
                    redirectResponse.pipe(downloadFile);
                    downloadFile.on('finish', () => {
                        let uploadFilename = './download.zip';
                        storage.bucket(bucketName).upload(uploadFilename, {gzip: true}).then(() => {
                            return appRes.send('success');
                        }).catch((err) => {
                            console.error(err);
                        })
                        
                    });
                })
            }
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    });



const server = app.listen(port);

module.exports = { app: app, server: server };