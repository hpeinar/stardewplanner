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
const favicon = require('serve-favicon');

app.enable('trust proxy');

// increased bodyParser limit to allow big farms
app.use(bodyParser.json({limit: '25mb'}));
app.use((req, res, next) => {
    req.log = log;
    next();
});

app.use(favicon(__dirname + '/public/favicon.ico'));

// currently nothing is at root, redirect use directly to planner
// app.get('/', (req, res) => {
//     res.redirect('/planner');
// });

// mount api endpoints
app.use('/api', require('./routes')());

// heartbeat endpoint for pinging applications
app.get('/heartbeat', (req, res) => {
    res.sendStatus(200);
});

// static mounts
app.use(express.static('./public'));
app.use('/planner/:id', express.static('./public/planner'));


// run express
app.listen(config.port, () => {
    log.info('App listening on port', config.port);
});