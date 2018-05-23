/**
 * Created by Henrik Peinar on 01/04/16
 */

'use strict';

const express = require('express');
const config = require('easy-config');
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
const uploader = require('../lib/uploader');

const limiter = new RateLimit({
    windowMs: 15*60*1000, // 15 minutes
    max: 600, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached,
});

module.exports = () => {
    let app = express.Router();

    app.get('/renders', (req, res) => {
        let baseQuery = db('render')
            .join('farm', 'farm.id', '=', 'render.farm_id')
            .limit(8)
            .select('render.*', 'farm.slug', 'farm.id AS farm_id')
            .whereNotNull('render.render_url');


        return Promise.all([
            baseQuery.clone().orderBy('render.created_at', 'DESC'),
            baseQuery.clone().orderBy('popular_at', 'DESC'),
            baseQuery.clone().orderBy('useful_at', 'DESC')
        ]).then(([latest, popular, useful]) => {
            res.json({
              latest,
              popular,
              useful
            });
        }).catch((err) => {
            req.log.error(err);
            res.status(500).json({message: 'Failed to list renders'});
        });
    });

    app.get('/featured', (req, res) => {
      return db('farm')
        .join('render', 'render.farm_id', '=', 'farm.id')
        .where('farm.featured', true)
        .whereNotNull('render.id')
        .orderBy('farm.featuredAt', 'DESC')
        .limit(1)
        .first()
        .then((renders) => {
          res.json(renders);
        })
        .catch((err) => {
          req.log.error(err);
          res.status(500).json({message: 'Failed to list renders'});
        });
    });
    
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
                uri: 'https://upload.farm/api/v1/plan',
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

                if (!body.url) {
                    req.log.error(error, body, 'No URL in render body');
                    res.sendStatus(500);
                    return next();
                }

                return db('render')
                  .insert({
                    farm_id: result.insertId,
                    original_url: body.url,
                    season: req.body.options.season || 'spring',
                    layout: req.body.options.layout
                  })
                  .then(renderInsertId => {
                    // We'll mirror upload.farm images to our storage to avoid excess bandwidth to their servers
                    // this will be done async, user does not have to wait for it
                    if (config.google.projectId) {

                      let renderID = body.url.split('/').pop();
                      let renderPicture = `https://upload.farm/static/renders/${renderID}/${renderID}-plan.png`;

                      uploader(renderPicture, config.google.renderBucket, result.id + '-' + (req.body.options.season || 'spring') + '.png')
                        .then((renderUrl) => {
                          if (renderUrl) {
                            return db('render').update({
                              render_url: renderUrl
                            }).where('id', renderInsertId[0]);
                          }
                        })
                        .catch((err) => {
                          console.error(err, 'Failed to upload render to google cloud storage');
                        })
                    }

                    res.json(body);
                  })
                  .catch((err) => {
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

        let jsonFarmData = JSON.stringify(farmData);
        let jsonOptions = JSON.stringify(farmData.options);

        return db.select('id', 'slug').from('farm').where({md5: uniqueHash}).then((results) => {
            if (results.length) {
                return Promise.resolve({id: results[0].slug, insertId: results[0].id});
            } else {
                return uniqueId().then((uniqueId) => {
                    let farm = {
                        slug: uniqueId,
                        md5: uniqueHash,
                        farmData: jsonFarmData,
                        options: jsonOptions,
                        season: oldSeason,
                        layout: hashedData.layout
                    };

                    return db('farm').insert(farm).then((insertId) => {
                        return Promise.resolve({id: uniqueId, insertId: insertId[0]});
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