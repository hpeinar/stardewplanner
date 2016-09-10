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


db.setup(console).then(function () {
    r.connect(config.rethinkdb).then(function (conn) {
        // start the process
        fs.readdir('./farms/', function (err, files) {
            if (err) {
                console.error(err);
                process.exit(1);
            }

            console.log('Starting migrating ', files.length);

            migrateFarm(files, 0, conn);
        });
    });
});


function migrateFarm (files, index, conn) {
    if (index >= files.length) {
        console.log('Migration done');
        process.exit(1);
    }

    Promise.all(files.slice(index, index+100).map(function (file) {
        return new Promise(function (resolve, reject) {
            if (!file) {
                resolve();
                return true;
            }

            fs.readFile('./farms/'+ file, function (err, data) {

                if (err) {
                    console.log('Error on index', index);
                    console.error(err);
                    reject(err);
                    return;
                }

                let importData = null;

                try {
                    importData = JSON.parse(data);
                } catch(e) {
                    console.log('Failed to parse json on ', index, file);
                    resolve();
                    return;
                }

                let farm = {
                    id: hri.random(),
                    farmData: importData,
                    oldId: files[index].split('.')[0]
                };

                r.table('farms').insert(farm).run(conn).then(function (results) {
                    if (results.inserted !== 1) {
                        console.error(results, 'Failed to insert farm on index', index);
                    }

                    resolve();

                }).error(function (err) {
                    console.log(err, 'Error on index ', index);
                    reject(err);
                });
            });
        });
    })).then(function () {
        console.log('Patch done');
        index += 100;

        migrateFarm(files, index, conn);
    }).catch(function (err) {
        console.log(err, 'Migration stopped');
    });
}