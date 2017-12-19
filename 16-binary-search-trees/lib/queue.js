'use strict';

class Queue{
  constructor(){
    this._data = [];
  }

  enqueue(value){
    this._data.push(value);
  }

  dequeue(){
    return this._data.shift();
  }

  getLength(){
    return this._data.length;
  }
}

module.exports = Queue;