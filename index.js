/**
 * Created by Henrik Peinar on 01/04/16
 */

'use strict';

const express = require('express');
const config = require('easy-config');
const bunyan = require('bunyan');
const log = bunyan.createLogger({name: "stardrew"});
const bodyParser = require('body-parser');
const app = require('express')();
const http = require('http').Server(app);
const favicon = require('serve-favicon');
const io = require('socket.io')(http);

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

// socket stuff
io.on('connection', function(socket) {
  console.log('a user connected');

  socket.broadcast.emit('join', socket.id);

  // make other sockets join this new socket
  io.of('/').clients((err, sockets) => {
    sockets.forEach((sId) => {
      if (sId !== socket.id) {
        socket.emit('join', sId);
      }
    });
  });

  socket.on('move_helpers', function (data) {
    socket.broadcast.emit('move_helpers', Object.assign(data, { socketId: socket.id }));
  });

  socket.on('draw_tile', function (data) {
    socket.broadcast.emit('draw_tile', Object.assign(data, { socketId: socket.id }));
  });

  socket.on('disconnect', function () {
    socket.broadcast.emit('leave', socket.id);
  });
});

// run express
http.listen(config.port, () => {
    log.info('App listening on port', config.port);
});
