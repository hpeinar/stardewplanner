'use strict';
/**
 * Exports knex DB connection
 *
 */

let config = require('easy-config');
let knex = require('knex')({
    client: 'mysql',
    connection: {
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        database: config.db.name
    }
});


module.exports = knex;