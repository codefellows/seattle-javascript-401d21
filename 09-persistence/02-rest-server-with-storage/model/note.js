'use strict';

const uuid = require('uuid/v1');

class Note{
  // vinicio - By design, title and content would be a string
  constructor(title,content){
    this.id = uuid();
    this.timestamp = new Date();

    // vinicio - error checking could be here
    this.title = title;
    this.content = content;
  }
}

module.exports = Note;