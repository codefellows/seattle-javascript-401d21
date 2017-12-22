'use strict';

const LinkedList = require('./linked-list');

class HashTable{
  constructor(capacity = 1024){
    this._capacity = capacity;
    this._buckets = new Array(capacity);
  }

  // vinicio - this function will be very prone to collisions,
  //           and it's not suited for production
  _generateHash(key) {
    if(typeof key !== 'string')
      throw new TypeError('_ERROR_ key should be a string');
    
    let rawHash = 0;

    for(let i in key){
      rawHash += key.charCodeAt(i);
    }

    return rawHash % this._capacity;
  }

  // 'gregor', 'cat'
  // object.gregor = 'cat';
  set(key,htValue){
    let hash = this._generateHash(key);

    // vinicio - the bucket is empty
    if(!this._buckets[hash]){
      this._buckets[hash] = new LinkedList({key,htValue});
      return this;
    }
    // vinicio - the bucket is NOT empty
    let node = this._buckets[hash].find(node => node.value.key === key);

    if(node){
      node.value.htValue = htValue; // vinicio - updating the value
      return this;
    }
    // vinicio - if we are not updating a key, we create a new element in the linked list
    this._buckets[hash].append(new LinkedList({key,htValue}));
    return this;
  }

  get(key){
    let hash = this._generateHash(key);

    if(!this._buckets[hash]){
      return undefined;
    }
    // vinicio - dealing with collisions
    let node = this._buckets[hash].find(node => node.value.key === key);

    if(node)
      return node.value.htValue;
    else
      return undefined;
  }
}