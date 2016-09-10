'use strict';

/**
 * Migrates all farms to RethinkDB, making them available from the DB instead of FS
 *
 */

const fs = require('fs');
const r = require('rethinkdb');
const db = require('./db');
const config = require('easy-config');
const hri = require('human-readable-ids').hri;


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

    console.log('Starting migrating', index, files[index]);
    fs.readFile('./farms/'+ files[index], function (err, data) {
        if (err) {
            console.log('Error on index', index);
            console.error(err);
            process.exit(1);
        }

        let importData = null;

        try {
            importData = JSON.parse(data);
        } catch(e) {
            console.log('Failed to parse json on ', index, files[index]);
            migrateFarm(files, ++index, conn);
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

            migrateFarm(files, ++index, conn);
        }).error(function (err) {
            console.log(err, 'Error on index ', index);
            process.exit(1);
        })


    });
}