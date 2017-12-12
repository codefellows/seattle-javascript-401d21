'use strict';

//const linkedList = require('./doubly-linked-list');

class StackLinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }

  append(node){
    if(!(node instanceof StackLinkedList))
      throw new TypeError('<node> should be an instance of StackLinkedList');
    
    if(!this.next){
      this.next = node;
      node.previous = this;
    }
    else
      this.next.append(node);
    
    return this;
  }
  
  push(value) {
    let stackNode = new StackLinkedList(value);
    this.append(stackNode);
  }

  pop() {
    if(this.value === '') {
      throw new TypeError('<node> must contain a value');
    }
    if(!this.next) {
      if(this.previous) {
        this.previous.next = null;
      } else {
        let newNode = this.value;
        this.value = undefined;
        return newNode;
      }
      return this.value;
    } else {
      return this.next.pop();
    }
  }
}

module.exports = StackLinkedList;