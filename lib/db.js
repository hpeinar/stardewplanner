'use strict';

/**
 * RethinkDB stuff
 */
module.exports = {
    setup: setup,
    createConnection: createConnection,
    closeConnection: closeConnection
};

const r = require('rethinkdb');
const config = require('easy-config');


function setup(log) {
    return r.connect(config.rethinkdb).then(function (conn) {
        return r.table('farms').run(conn).then(function (err, result) {
            log.info('RethinkDB ready');
        }).error(function (err) {
            return r.dbCreate(config.rethinkdb.db).run(conn).finally(function () {
                return r.tableCreate('farms').run(conn);
            }).finally(function () {
                return r.table('farms').indexCreate('oldId').run(conn);
            }).then(function () {
                log.info('RethinkDB ready');
                conn.close();
            }).error(function (err) {
                log.warn(err, 'Failed to create DB/Tables');
            });
        });

    }).error(function (err) {
        log.error(err, 'Failed to setup rethinkDB');
        process.exit(1);
    });
}

function createConnection (req, res, next) {
    r.connect(config.rethinkdb).then(function (conn) {
        req._conn = conn;
        next();
    }).error(function (err) {
        req.log.error(err, 'Failed to create rethinkDB connection');
        res.sendStatus(500);
    });
}

function closeConnection (req, res, next) {
    console.log('Closing connection');
    req._conn.close();
    next();
}