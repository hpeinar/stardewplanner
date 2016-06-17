/**
 * Created by Henrik Peinar on 01/04/16
 */

'use strict';

let express = require('express');
let config = require('easy-config');
let bunyan = require('bunyan');
let log = bunyan.createLogger({name: "stardrew"});
let bodyParser = require('body-parser');
let app = express();

app.enable('trust proxy');

// increased bodyParser limit to allow big farms
app.use(bodyParser.json({limit: '25mb'}));

// currently nothing is at root, redirect use directly to planner
app.get('/', function (req, res) {
    res.redirect('/planner');
});

// mount api endpoints
app.use('/api', require('./routes')());

// heartbeat endpoint for pinging applicatons
app.get('/heartbeat', function (req, res) {
    res.sendStatus(200);
});

// static mounts
app.use(express.static('./public'));
app.use('/planner/:id', express.static('./public/planner'));


app.listen(config.port, function () {
    log.info('App listening on port', config.port);
});