'use strict';

const uuid = require('uuid');

module.exports = function(socket) {
  this.socket = socket;
  this.user = `user_${Math.random()}`;
  this.nick = uuid('uuid/v4');
};