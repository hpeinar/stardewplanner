const request = require('request');
const config = require('easy-config');
const path = require('path');
const storage = require('@google-cloud/storage')({
  projectId: config.google.projectId,
  keyFilename: path.join('../config/'+ config.google.keyFileName)
});

function saveToStorage(attachmentUrl, bucketName, objectName) {
  return new Promise((resolve, reject) => {
    const req = request(attachmentUrl);
    req.pause();
    req.on('response', res => {

      // Don't set up the pipe to the write stream unless the status is ok.
      // See https://stackoverflow.com/a/26163128/2669960 for details.
      if (res.statusCode !== 200) {
        resolve();
      }

      const writeStream = storage.bucket(bucketName).file(objectName)
        .createWriteStream({
          // Tweak the config options as desired.
          gzip: true,
          public: true,
          metadata: {
            contentType: res.headers['content-type']
          }
        });
      req.pipe(writeStream)
        .on('finish', () => {
          console.log(arguments, 'saved');
          resolve();
        })
        .on('error', err => {
          writeStream.end();
          console.error(err);
          reject(err);
        });

      // Resume only when the pipe is set up.
      req.resume();
    });
    req.on('error', err => {
      console.error(err);
      reject(err);
    });
  });
}

module.exports = saveToStorage;