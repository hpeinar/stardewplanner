'use strict';

const config = require('easy-config');
const db = require('../lib/db');

let count = 0;

function cleanObject (incomingObj) {
  Object.keys(incomingObj).forEach(objectKey => {
    if (Array.isArray(incomingObj[objectKey])) {
      return incomingObj;
    }

    if (incomingObj[objectKey] === false) {
      delete incomingObj[objectKey];
    }

    if (typeof incomingObj[objectKey] === 'object' && incomingObj[objectKey] !== null) {
      incomingObj[objectKey] = cleanObject(incomingObj[objectKey]);
    }
  });

  return incomingObj;
}

function migrateFarms () {
  console.time('Migration time');
  return db.select('id', 'options').from('farm').limit(50).offset(count).then(farmsToMigrate => {
    count += 50;
    if (!farmsToMigrate.length) {
      throw new Error('No more plans to migrate');
    }

    let p = Promise.all(farmsToMigrate.map(farm => {
      let newOptions;
      try {
        newOptions = JSON.parse(farm.options);
        delete newOptions['farmDataStorageFile'];

        newOptions = cleanObject(newOptions);
      } catch(err) {
        console.log('Failed to parse farm options JSON', farm.id);
      }

      return db('farm').update({
        options: JSON.stringify(newOptions)
      }).where('id', farm.id);
    }));

    return p.then(() => {
      console.log(count +' farms migrated');
      console.timeEnd('Migration time');
      migrateFarms();
    })
  });
}

migrateFarms();
