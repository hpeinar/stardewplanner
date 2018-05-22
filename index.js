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

app.get('/', (req, res) => {
    res.redirect('/planner');
});

// mount api endpoints
app.use('/api', require('./routes')());

// heartbeat endpoint for pinging applications
app.get('/heartbeat', (req, res) => {
    res.sendStatus(200);
});

let socketNameMap = {};

app.get('/online', (req, res) => {
  io.of('/').clients((error, clients) => {
    res.json({
      connected_sockets: clients.length,
      named_sockets: Object.keys(socketNameMap).length
    });
  });

});

// static mounts
app.use(express.static('./public'));
app.use('/planner/:id', express.static('./public/planner'));


io.on('connection', function(socket) {
  socket.on('join_room', function (data, fn) {
    log.info('Socket joining room', data);

    if (config.validRooms.includes(data.room_name.toLowerCase())) {
      const roomName = data.room_name;

      io.of('/').in(roomName).clients((error, clients) => {
        if (clients.length > 3 || (config.validSecret && config.validSecret === data.secret)) {
          fn('full');
          return;
        }

        socket.join(data.room_name.toLowerCase(), () => {
          socketNameMap[socket.id] = data.name;
          fn('success');

          socket.broadcast.emit('join', {
            name: socketNameMap[socket.id],
            socketId: socket.id
          });

          // make other sockets join this new socket
          io.of('/').in(roomName).clients((err, sockets) => {
            sockets.forEach((sId) => {
              if (sId !== socket.id) {
                socket.emit('join', {
                  name: socketNameMap[sId],
                  socketId: sId
                });
              }
            });

            // if new socket is in index 0 of the socket list, it is the only socket and thus the "master"
            if (sockets[0] !== socket.id) {
              console.log('emitting sync req');
              io.of('/').in(roomName).connected[sockets[0]].emit('synchronization_request');
            }
          });

          ['synchronize', 'move_helpers', 'draw_tile', 'place_building', 'remove_building', 'change_layout'].forEach(event => {
            socket.on(event, data => {
              socket.to(roomName).broadcast.emit(event, Object.assign(data, {socketId: socket.id}));
            });
          });

          socket.on('disconnect', function () {
            delete socketNameMap[socket.id];
            socket.to(roomName).broadcast.emit('leave', socket.id);
          });
        });
      });
    } else {
      fn('failed');
    }
  });
});

// run express
http.listen(config.port, () => {
    log.info('App listening on port', config.port);
});
