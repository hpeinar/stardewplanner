/**
 * Created by Henrik Peinar on 01/04/16
 */

'use strict';

const express = require('express');
const config = require('easy-config');
const bunyan = require('bunyan');
const log = bunyan.createLogger({name: "stardrew"});
const bodyParser = require('body-parser');
const app = express();
const db = require('./lib/db');
const favicon = require('serve-favicon');

app.enable('trust proxy');

// increased bodyParser limit to allow big farms
app.use(bodyParser.json({limit: '25mb'}));
app.use((req, res, next) => {
    req.log = log;
    next();
});

app.use(db.createConnection);
app.use(favicon(__dirname + '/public/favicon.ico'));

// currently nothing is at root, redirect use directly to planner
app.get('/', function (req, res) {
    res.redirect('/planner');
});

// mount api endpoints
app.use('/api', require('./routes')());

// heartbeat endpoint for pinging applications
app.get('/heartbeat', function (req, res) {
    res.sendStatus(200);
});

// static mounts
app.use(express.static('./public'));
app.use('/planner/:id', express.static('./public/planner'));

app.use(db.closeConnection);

// do rethinkDB setup and then run express
db.setup(log).then(function () {
    app.listen(config.port, function () {
        log.info('App listening on port', config.port);
    });
});