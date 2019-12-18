'use strict';

const config = require('easy-config');
const db = require('../lib/db');
const path = require('path');

const storage = require('@google-cloud/storage')({
  projectId: config.google.projectId,
  keyFilename: path.join('./config/'+ config.google.keyFileName)
});

let count = 0;

function migrateFarms () {
  console.time('Migration time');
  return db.select('*').from('farm').whereNotNull('farmData').limit(50).then(farmsToMigrate => {
    if (!farmsToMigrate.length) {
      throw new Error('No more plans to migrate');
    }

    let p = Promise.all(farmsToMigrate.map(farm => {
      let farmFileName = (farm.slug || farm.oldId) + '.json';
      return storage.bucket(config.google.planBucket).file(farmFileName).save(farm.farmData, { resumable: false })
        .then(() => {
          try {
            farm.options = JSON.parse(farm.options);
          } catch (err) {}
          (farm.options || {}).farmDataStorageFile = farmFileName;
          farm.options = JSON.stringify(farm.options);
          farm.farmData = null;

          count++;
          return db('farm').update({
            options: farm.options,
            farmData: null
          }).where('id', farm.id);
        })
        .catch((err) => {
          console.error(err, 'Failed to migrate farm '+ farmFileName +' to google cloud storage');
          return farm;
        });
    }));

    return p.then(() => {
      console.log(count +' farms migrated');
      console.timeEnd('Migration time');
      migrateFarms();
    })
  });
}

migrateFarms();
