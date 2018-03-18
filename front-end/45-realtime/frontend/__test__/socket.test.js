'use strict';

const socketIO = require('socket.io-client');
const socketURL = 'http://localhost:3000';

const options = {
  transports : ['websocket'],
  'force new connection': true
};


test('mario', (done) => {
  let client = socketIO.connect(socketURL,options);

  client.on('connect', data => {
    client.emit('SEND_MESSAGE','mario');
  });
  client.on('RECEIVE_MESSAGE', (data) => {
    expect(data).toEqual('You sent a message!');
    done();
  });
});