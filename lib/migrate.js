'use strict';

/**
 * Migrates all farms to RethinkDB, making them available from the DB instead of FS
 *
 */

let fs = require('fs');
let r = require('rethinkdb');
let db = require('./db');
let config = require('easy-config');
let hri = require('human-readable-ids').hri;
let async = require('async');


db.setup(console).then(function () {
    r.connect(config.rethinkdb).then(function (conn) {
        // start the process
        fs.readdir('./farms/', function (err, files) {
            if (err) {
                console.error(err);
                process.exit(1);
            }

            console.log('Starting migrating ', files.length);

            async.mapSeries(files, function (longFileName, cb) {
                (new Promise(function (resolve, reject) {
                    let oldId = longFileName.split('.')[0];

                    r.table('farms').filter({
                        'oldId': oldId
                    }).run(conn).then(farm => farm.toArray()).then(function (oldFarms) {
                        if (oldFarms.length <= 0) {
                            console.log('Migrating', longFileName);
                            return migrateFarm(longFileName, conn, resolve, reject);
                        }

                        resolve();
                    }).error(function (err) {
                        console.log(err);
                        resolve();
                    });
                })).then(function () {
                    cb(null);
                }).catch(function (err) {
                    cb(err);
                });
            }, function (err, results) {
                if (err) {
                    console.error(err, 'Migration errored');
                    process.exit();
                }

                console.log('Migration done', results.length);
                process.exit();
            });
        });
    });
});


function migrateFarm (file, conn, resolve, reject) {
    if (!file) {
        resolve();
        return true;
    }

    fs.readFile('./farms/'+ file, function (err, data) {

        if (err) {
            console.log('Error on file', file);
            console.error(err);
            reject(err);
            return;
        }

        let importData = null;

        try {
            importData = JSON.parse(data);
        } catch(e) {
            console.log('Failed to parse json on ', file);
            resolve();
            return;
        }

        let farm = {
            id: hri.random(),
            farmData: importData,
            oldId: file.split('.')[0]
        };

        r.table('farms').insert(farm).run(conn).then(function (results) {
            if (results.inserted !== 1) {
                console.error(results, 'Failed to insert farm', file);
            }

            resolve();

        }).error(function (err) {
            console.log(err, 'Error on index ');
            reject(err);
        });
    });
}