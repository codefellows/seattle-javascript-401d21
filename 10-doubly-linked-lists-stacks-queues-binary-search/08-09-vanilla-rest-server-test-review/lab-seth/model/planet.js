'use strict';

const uuid = require('uuid/v1');
const faker = require('faker');

class Planet{
  constructor(name,content){
    this.id = uuid();
    this.discoverDate = faker.date.past();

    this.name = name;
    this.content = content;
  }
}

module.exports = Planet;