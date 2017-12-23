'use strict';
/* Hash Table
  references to linked list

  Values
  Array called buckets
    array is going to have a fixed size
  capacity 


  Operations
  hash function
  set
  get
  remove
*/
const LinkedList = require('./linked-list.js');

module.exports = class HashTable{
  constructor(capacity= 1024){
    this._capacity = capacity;
    this._buckets = new Array(capacity);
  }

  _generateHash(key){
    if(typeof key !== 'string')
      throw new TypeError('__HASTABLE_ERROR_ key should be a string');
    let rawHash = 0;
    
    for(let i in key){
      rawHash += key.charCodeAt(i);
    }

    return rawHash % this._capacity;
  }

  set(key,htValue){
    // calculate hash
    // check if bucket is empty
    // update if neccesary
    // create a new linked list if not (handle collisions)
    let hash = this._generateHash(key);

    if(!this._buckets[hash]){//vinicio - create a new linked list if there is nothing
      this._buckets[hash] = new LinkedList({key,htValue});
      return this;
    }

    let node = this._buckets[hash].find(node => node.value.key === key);

    if(node){
      node.value.htValue = htValue;
      return this;
    }
    this._buckets[hash].append(new LinkedList({key,htValue}));
    return this;
  }
  
  get(key){
    //get hash
    //check if bucket is empty
    // return either the value or undefined
    let hash = this._generateHash(key);
    if(!this._buckets[hash])
      return; //vinicio - return undefined;

    // vinicio - checkig if key is present wit existing hash
    let node = this._buckets[hash].find(node => node.value.key === key);

    if(node)
      return node.value.htValue;
  }

  delete(key){
    //get hash
    //check if buckets is empty
    //find node in linked list
    //  remove from linked list if present
    let hash = this._generateHash(key);

    if(!this._buckets[hash])
      return false;

    let node = this._buckets[hash].find(node => node.value.key === key);

    if(node){
      this._buckets[hash] = this._buckets[hash].remove(node);
      return true;
    }
    return false;
  }

};