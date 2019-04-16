require('dotenv').config();

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

async function uploadFile(bucketName, filename) {
// Uploads a local file to the bucket
await storage.bucket(bucketName).upload(filename, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    metadata: {
      // Enable long-lived HTTP caching headers
      // Use only if the contents of the file will never change
      // (If the contents will change, use cacheControl: 'no-cache')
      cacheControl: 'public, max-age=31536000',
    },
  }).catch((e) => console.error(e));
  
  console.log(`${filename} uploaded to ${bucketName}.`);
}

module.exports = uploadFile;