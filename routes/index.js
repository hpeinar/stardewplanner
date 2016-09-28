/**
 * Created by Henrik Peinar on 01/04/16
 */

'use strict';

const express = require('express');
const fs = require('fs');
const r = require('rethinkdb');
const importer = require('../lib/importer');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
    maxFieldsSize: '25MB'
});
const cors = require('cors');
const RateLimit = require('express-rate-limit');
const hri = require('human-readable-ids').hri;

const limiter = new RateLimit({
    windowMs: 15*60*1000, // 15 minutes
    max: 600, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached,
});

module.exports = function () {
    let app = express.Router();
    
    app.post('/import', [limiter, cors(), multipartMiddleware], function (req, res) {
        if (!req.files || !req.files.file) {
            res.status(500).json({message: 'Missing file'});
            return;
        }

        let importData = null;

        importer(req.files.file.path).then(function (data) {
            importData = data;

            return uniqueId(req);
        }).then(function (readableId) {
            let farm = {
                id: readableId,
                farmData: importData
            };

            r.table('farms').insert(farm).run(req._conn).then(function (results) {
                if (results.inserted !== 1) {
                    req.log.error('Failed to save imported farm');
                    res.sendStatus(500);
                    return;
                }

                res.json({
                    id: readableId,
                    absolutePath: 'https://stardew.info/planner/'+ readableId
                });
            }).error(function (err) {
                req.log.error(err, 'RethinkDB error while saving imported farm');
                res.sendStatus(500);
            });

        }).catch(function (err) {
            req.log.error(err);
            res.status(500).json({message: 'Failed to import save file'});
        })
    });

    app.get('/:id', function (req, res) {
        r.table('farms').get(req.params.id).run(req._conn)
            .then(function (results) {
                if (!results) {
                    return r.table('farms').getAll(req.params.id, {index: 'oldId'}).run(req._conn);
                } else {
                    return results;
                }
            })
            .then(function (farm) {
                if (typeof farm.toArray === 'function') {
                    let data = farm.toArray();
                    farm.close();

                    return data;
                } else {
                    return farm;
                }
            })
            .then(function (farm) {

                console.log('got farm?', farm);
                if (!farm.farmData && !farm.length) {
                    res.sendStatus(404);
                    return;
                }

                res.json((farm.farmData || farm[0].farmData));
            }).error(function (err) {
                req.log.error(err, 'Failed to get farm');
                res.sendStatus(404);
            });
    });

    app.post('/save', function (req, res) {
        uniqueId(req).then(function (uniqueId) {
            let farm = {
                id: uniqueId,
                farmData: req.body
            };

            r.table('farms').insert(farm).run(req._conn).then(function (result) {
                if (result.inserted !== 1) {
                    console.log(result);
                    req.log.error('Failed to insert farm');
                    res.sendStatus(500);
                    return;
                }

                res.json({id: uniqueId});
            }).error(function (err) {
                req.log.error(err, 'Failed to save farm');
                res.sendStatus(500);
            });
        }).catch(function (err) {
            req.log.error(err, 'Failed to save farm, in catch');
            res.sendStatus(500);
        });
    });

    function uniqueId (req) {
        let readableId = hri.random();
        return new Promise(function (resolve, reject) {
            r.table('farms').get(readableId).run(req._conn).then(function (results) {
                if (results) {
                    return uniqueId(req);
                } else {
                    resolve(readableId);
                }
            }).error(err => reject(err));
        });
    }

    return app;
};