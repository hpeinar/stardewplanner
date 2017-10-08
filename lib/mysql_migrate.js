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
    console.log('Migration complete');
}).catch((err) => {
    console.error(err, 'Error while migrating farms');
    process.exit();
});


// migrate one farm
function migrateFarm (rCon) {
    //.then(cur => cur.toArray())
    return r.table('farms').limit(1).delete({returnChanges: "always"}).run(rCon).then((rethinkFarm) => {
        if (!rethinkFarm) {
            return Promise.resolve();
        }

        rethinkFarm = rethinkFarm.changes[0].old_val;
        let farmData = JSON.stringify(rethinkFarm.farmData);

        return db('farms').insert({
          md5: rethinkFarm.md5,
          oldId: rethinkFarm.oldId,
          slug: rethinkFarm.id,
          farmData: farmData
        }).then(() => {
            return migrateFarm(rCon);
        });
    });
}