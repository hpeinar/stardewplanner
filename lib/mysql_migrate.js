'use strict';

let db = require('./db');
let r = require('rethinkdb');
let config = require('easy-config');
let crypto = require('crypto');

let rConn = null;

r.connect({
    db: 'stardew',

}).then((rCon) => {
    return migrateFarm(rCon);
}).then(() => {

}).catch((err) => {
    console.error(err, 'Error while migrating farms');
    process.exit();
});


// migrate one farm
function migrateFarm (rCon) {
    //.then(cur => cur.toArray())
    return r.table('farms').get('clever-quail-85').run(rCon).then((rethinkFarm) => {
        //!TODO: Get matching md5's or generate new one for eachc
        let farmData = rethinkFarm.farmData;

        let hashedData = {
            buildings: farmData.buildings,
            tiles: farmData.tiles,
            options: farmData.options
        };

        delete rethinkFarm.md5;
        if (!rethinkFarm.md5) {
            let oldSeason = null;
                delete hashedData.options;
                //delete rethinkFarm.farmData.xmlSaveFile;
            // if (rethinkFarm.farmData.options.season) {
            //     oldSeason = rethinkFarm.farmData.options.season;
            // }
            // if (oldSeason) {
            //     rethinkFarm.farmData.options.season = oldSeason;
            // }
            console.log(JSON.stringify(hashedData));
            rethinkFarm.md5 = crypto.createHash('md5').update(JSON.stringify(hashedData, stringifyReplacer)).digest("hex");
        }

        console.log('generaed md5', rethinkFarm.md5);
    });
}

function stringifyReplacer(key, value) {
    if (Number.isInteger(value)) {
        return value.toString();
    }

    return value;
}