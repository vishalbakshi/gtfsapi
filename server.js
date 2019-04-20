require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const connection = require('./database');
const port = 3306;
const https = require('https');

// unzip library
const yauzl = require('yauzl');

// fs for creating streams
const fs = require('fs');

// uploadFile function
const uploadFile = require('./uploadFile');

// unzipFile Module
const unzipFile = require('./unzipFile');

// TODO: unzip the file using `yauzl` 
// TODO: Insert the file contents to Cloud SQL
// TODO: Query Cloud SQL and send query results as response

// GET: Request GTFS zip file and upload to Google Cloud Storage
app.route('/get-gtfs-zip-file')
    // I've differentiated the request and response objects between 
    // the app's GET route, the first GET request and the second GET request
    .get((appReq, appRes) => {
        // Prepare WriteStream to download transitfeeds zip file
        let requestURL = process.env.TRANSITFEEDS_SFMTA_REQUEST_URL;
        let downloadFile = fs.createWriteStream("./download.zip");

        // Request the zip file from transitfeeds
        https.get(requestURL, (res) => {
            const { statusCode } = res;
            // Transitfeeds download URL will redirect to the zip file's location
            // This server should do the same
            if (statusCode == 302) {
                https.get(res.headers['location'], (redirectResponse) => {
                    redirectResponse.pipe(downloadFile);
                    downloadFile.on('finish', () => {
                        // When WriteStream is done
                        // upload this file to Google Cloud Storage
                        let uploadFilename = './download.zip';
                        let bucketName = 'gtfs-bucket';
                        uploadFile(bucketName, uploadFilename)
                            .then(() => {
                                appRes.send('success'); 
                            });   
                    });
                })
            }
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    });

// GET: Unzip GTFS data file
app.route('/unzip-gtfs-file')
    .get((appReq, appRes) => {
        unzipFile(null, './download.zip', responseCallback);

        function responseCallback() {
            appRes.send('success')
        }
        
    })


const server = app.listen(port, () => console.log('Listening on port'));

module.exports = { app: app, server: server };