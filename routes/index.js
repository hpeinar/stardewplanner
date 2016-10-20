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
const crypto = require('crypto');
const request = require('request');
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
    
    app.post('/import', [limiter, cors(), multipartMiddleware], function (req, res, next) {
        if (!req.files || !req.files.file) {
            res.status(500).json({message: 'Missing file'});
            return;
        }

        let importData = null;

        importer(req.files.file.path).then(function (data) {
            importData = data;

            return uniqueId(req._conn);
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

                next();
            }).error(function (err) {
                req.log.error(err, 'RethinkDB error while saving imported farm');
                res.sendStatus(500);
                next();
            });

        }).catch(function (err) {
            req.log.error(err);
            res.status(500).json({message: 'Failed to import save file'});
            next();
        });


    });

    app.get('/:id', function (req, res, next) {
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
                    return data;
                } else {
                    return farm;
                }
            })
            .then(function (farm) {

                if (!farm.farmData && !farm.length) {
                    res.sendStatus(404);
                    return;
                }

                res.json((farm.farmData || farm[0].farmData));
                next();
            }).error(function (err) {
                req.log.error(err, 'Failed to get farm');
                res.sendStatus(404);
                next();
            });
    });

    app.post('/save', function (req, res, next) {
        save(req.body, req._conn).then(function (result) {
            res.json({id: result.id});
            next();
        }).catch(function (err) {
            req.log.error(err, 'Failed to save farm, in catch');
            res.sendStatus(500);
            next();
        });
    });

    app.post('/render', function (req, res, next) {
        save(req.body, req._conn).then(function (result) {
            // after saving, post it to upload.farm
            request({
                method: 'POST',
                uri: 'http://upload.farm/api/v1/plan',
                body: {
                    plan_json: req.body,
                    season: req.body.options.season || 'spring',
                    source_url: 'https://stardew.info/planner/'+ result.id
                },
                json: true
            }, function (error, response, body) {

                if (error) {
                    res.status(500).json(body);
                    return next();
                }

                res.json(body);
                next();
            });


        }).catch(function (err) {
            req.log.error(err, 'Failed to save farm, in catch');
            res.sendStatus(500);
            next();
        });
    });

    function save (farmData, conn) {
        // generate unique hash but take the season out of it
        let oldSeason = null;
        if (farmData.options.season) {
            oldSeason = farmData.options.season;
            delete farmData.options.season;
        }
        let uniqueHash = crypto.createHash('md5').update(JSON.stringify(farmData)).digest("hex");
        farmData.options.season = oldSeason;

        return r.table('farms').getAll(uniqueHash, {index: 'md5'}).run(conn).then(farms => farms.toArray()).then(function (results) {
            if (results.length) {
                return Promise.resolve({id: results[0].id});
            } else {
                return uniqueId(conn).then(function (uniqueId) {
                    let farm = {
                        id: uniqueId,
                        md5: uniqueHash,
                        farmData: farmData
                    };

                    return r.table('farms').insert(farm).run(conn).then(function (result) {
                        if (result.inserted !== 1) {
                            throw new Error('Failed to insert farm')
                        }

                        return Promise.resolve({id: uniqueId});
                    })
                });
            }
        }).error(function (err) {
            throw new Error('Failed to save farm');
        });
    }

    function uniqueId (conn) {
        let readableId = hri.random();
        return new Promise(function (resolve, reject) {
            r.table('farms').get(readableId).run(conn).then(function (results) {
                if (results) {
                    return uniqueId(conn);
                } else {
                    resolve(readableId);
                }
            }).error(err => reject(err));
        });
    }

    return app;
};