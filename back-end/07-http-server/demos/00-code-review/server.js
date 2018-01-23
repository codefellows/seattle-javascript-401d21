'use strict';

const net = require('net');
const Client = require('./model/client');
const cmd = require('./lib/cmd');
const ascii = require('./assets/ascii');

const server = module.exports = net.createServer();
const PORT = process.env.PORT || 3000;
let clientPool = [];

server.on('connection', function (socket) {
  let client = new Client(socket);
  clientPool.push(client);
  clientPool.map(c => c.socket.write(`\n\t${client.nick} has joined the chat\n`))

  socket.on('data', function (data) {
    let msg = cmd(data, clientPool);
    socket.emit(msg.command, msg);
  });

  socket.on('list', function () {
    client.socket.write('\n\tConnected Users:\n');
    clientPool.map (c =>  client.socket.write(`\n\t${c.nick}\n`));
  });

  socket.on('nickname', function(data) {
    clientPool.map(c => c.socket.write(`\n\t\t${client.nick} has changed their name to ${data.name}\n`));
    client.nick = data.name;
  });

  socket.on('message', function (data) {
    let message = data.said;
    clientPool.filter(c => c.user !== client.user)
      .map(c => c.socket.write(`\n${client.nick}: ${message}\n`));
    client.socket.write(`\nYou (${client.nick}) Said: ${message}\n`);
  });

  socket.on('dm', function (data) {
    let who = clientPool.filter(c => c.nick === data.name);
    who[0].socket.write(`\nDirectly From ${client.nick}: ${data.said}\n`);
    client.socket.write(`\nDirectly To ${data.name}: ${data.said}\n`);
  });

  socket.on('jeep', function () {
    let jeep = ascii.jeep.split('%');
    clientPool.map(c => c.socket.write(`\n${jeep[0]}${client.nick}'s A JEEP\n\n`));
  });

  socket.on('facepalm', function () {
    clientPool.map(c => c.socket.write(`\n${client.nick} is disappointed\n\n${ascii.facepalm}`));
  });

  socket.on('close', function () {
    clientPool = clientPool.filter(c => c.user !== client.user);
    clientPool.map(c => c.socket.write(`\n\t${client.nick} has left the chat\n`));
    socket.end();
  });

  socket.on('error', function (data) {
    client.socket.write(`\n\t\t!!!\tError\t!!!:\n \t\t${data.err}\n`);
  });
});

server.listen(PORT, () => console.log(`listening on ${PORT}`));