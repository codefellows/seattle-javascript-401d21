'use strict';

//------------------------------------------------------------------------
// Server
//------------------------------------------------------------------------
const express = require('express');
const app = express();
const httpServer = require('http').Server(app);
require('dotenv').config();
//------------------------------------------------------------------------
// Socket
//------------------------------------------------------------------------
const realTimeServer = require('socket.io')(httpServer);
const uuid = require('uuid');
const events = require('./lib/events');
//------------------------------------------------------------------------

realTimeServer.on('connection', socket => {
  console.log('connection',socket.id);

  socket.on(events.SEND_MESSAGE, message => {
    console.log('socket event',events.SEND_MESSAGE);
    socket.emit(events.RECEIVE_MESSAGE,'You sent a message!');
    realTimeServer.emit(events.RECEIVE_MESSAGE, {
      ...message,
      id: uuid(),
      timestamp: new Date(),
    });
  });
});

realTimeServer.on('disconnect', () => {
  console.log("LEFT", realTimeServer.id);
});

realTimeServer.on('error', error => {
  console.error('__ERROR__',error);
});

httpServer.listen(process.env.PORT, () => {
  console.log('__SERVER_UP__', process.env.PORT);
});
