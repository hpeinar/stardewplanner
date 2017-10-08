/**
 * Created by Henrik Peinar on 01/04/16
 */

'use strict';

const express = require('express');
const fs = require('fs');
const db = require('../lib/db');
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

module.exports = () => {
    let app = express.Router();
    
    app.post('/import', [limiter, cors(), multipartMiddleware],(req, res, next) => {
        if (!req.files || !req.files.file) {
            res.status(500).json({message: 'Missing file'});
            return;
        }

        importer(req.files.file.path).then((farmData) => {
            return save(farmData).then((result) => {
                res.json({
                    id: result.id,
                    absolutePath: 'https://stardew.info/planner/'+ result.id
                });
            });
        }).catch(function (err) {
            req.log.error(err);
            res.status(500).json({message: 'Failed to import save file'});
        });
    });

    app.get('/:id', (req, res, next) => {
        db.select('farmData', 'parentId').from('farm').where({slug: req.params.id}).orWhere({oldId: req.params.id})
            .then(farm => farm[0])
            .then(farm => {
                // if farm has parent, show parent
                if (farm && farm.parentId && farm.parentId > 0) {
                    return db.select('farmData').from('farm').where({id: farm.parentId});
                }

                return farm;
            })
            .then((farm) => {
                if (!farm || !farm.farmData) {
                    res.sendStatus(404);
                    return;
                }

                res.json(JSON.parse(farm.farmData));
                next();
            }).catch((err) => {
                req.log.error(err, 'Failed to get farm');
                res.sendStatus(404);
                next();
            });
    });

    app.post('/save', (req, res, next) => {
        return save(req.body).then((result) => {
            res.json({id: result.id});
        }).catch((err) => {
            req.log.error({err}, 'Failed to save farm, in catch');
            res.sendStatus(500);
        });
    });

    app.post('/render', (req, res, next) => {
        return save(req.body).then((result) => {
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
            }, (error, response, body) => {

                if (error) {
                    req.log.error(error, 'Failed to render in upload.farm');
                    res.status(response.statusCode).json(body);
                    return next();
                }

                return db('farm')
                  .update({
                      render_url: body.url
                  })
                  .where('id', result.id)
                  .then(() => {
                    res.json(body);
                  })
                  .catch(() => {
                    req.log.error(err, 'Failed to save farm, in catch');
                    res.sendStatus(500);
                  });
            });


        }).catch((err) => {
            req.log.error(err, 'Failed to save farm, in catch');
            res.sendStatus(500);
        });
    });

    /**
     * Handles saving farm to DB. If md5 hash is found from the DB, that farm is returned instead (avoids duplicate saves)
     * @param farmData
     * @returns {Promise.<TResult>|*}
     */
    function save (farmData) {
        let hashedData = {
            buildings: farmData.buildings,
            tiles: farmData.tiles,
            options: farmData.options
        };

        // generate unique hash but take the season out of it
        let oldSeason = null;
        if (hashedData.options.season) {
            oldSeason = hashedData.options.season;
            delete hashedData.options.season;
        }
        let uniqueHash = crypto.createHash('md5').update(JSON.stringify(hashedData)).digest("hex");
        if (oldSeason) {
            farmData.options.season = oldSeason;
        }

        console.log(farmData);
        return db.select('id', 'slug').from('farm').where({md5: uniqueHash}).then((results) => {
            if (results.length) {
                return Promise.resolve({id: results[0].slug});
            } else {
                return uniqueId().then((uniqueId) => {
                    let farm = {
                        slug: uniqueId,
                        md5: uniqueHash,
                        farmData: farmData,
                        options: hashedData.options,
                        season: oldSeason,
                        layout: hashedData.layout
                    };

                    return db('farm').insert(farm).then(() => {
                        return Promise.resolve({id: uniqueId});
                    });
                });
            }
        });
    }

    /** Generated unique readable slug for the farm **/
    function uniqueId () {
        let readableId = hri.random();
        return db.select('id').from('farm').where({slug: readableId}).then((results) => {
            if (results.length) {
                return uniqueId();
            } else {
                return Promise.resolve(readableId);
            }
        });
    }

    return app;
};