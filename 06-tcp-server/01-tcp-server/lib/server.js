'use strict';

const net = require('net');
const winston = require('winston');
const faker = require('faker');
// ------------------------------------------------------
let logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({ filename: 'log.json' }),
  ],
});

logger.log('info','Hello world!');
// winston.level = 'debug';
// winston.log('debug','Hello world!');
// ------------------------------------------------------

const app = net.createServer();
let clients = [];
// ------------------------------------------------------

let parseCommand = (message,socket) =>{
  if(message.startsWith('@')){
    let parsedCommand = message.split(' ');
    let commandWord = parsedCommand[0];

    switch(commandWord){
    case'@list':// vinicio - if(commandWord === '@list')
      socket.write(clients.map(client => client.name).join('\n') + '\n');
      break;
    default:
      socket.write('Valid commands: @list\n');
      break;
    }
    return true;
  }
  return false;
};

app.on('connection', (socket) => {
  socket.name = faker.internet.userName();
  clients.push(socket);
  logger.log('info', `Net socket`);// [object object]
  socket.write('Welcome to 401d19 chatroom\n'); 
  socket.write(`Your name is ${socket.name}\n`);


  socket.on('data',(data) => {
    logger.log('info', `Processing data: ${data}`);
    let message = data.toString().trim();

    if(parseCommand(message,socket))
      return;

    for(let client of clients){
      //vinicio - instead of doing clients[client] I can use directly client
      if(client !== socket)
        client.write(`${socket.name}: ${message}\n`);
    }
  });

  let removeClient = (socket) => () => {
    clients = clients.filter((client) => {
      return client !== socket;
    }); 
    logger.log('info',`Removing ${socket.name}`);
  };
  socket.on('error', removeClient(socket));
  socket.on('close', removeClient(socket));
});

const server = module.exports = {};

server.start = (port, callback) => {
  logger.log('info',`Server is up on port ${port}`);
  console.log('info',`Server is up on port ${port}`);
  return app.listen(port,callback);
};

server.stop = (callback) => {
  logger.log('info',`Server is off`);
  return app.close(callback);
};