'use strict';

class DoublyLinkedList{
  constructor(value){
    this.value = value;
    this.next = null;
    this.previous = null;
    this.HEAD = null;
    this.TAIL = null;
  }

  append(node){
    if(!(node instanceof DoublyLinkedList))
      throw new TypeError('<node> should be an instance of DoublyLinkedList');
    
    if(!this.next){
      this.next = node;
      node.previous = this;
    }
    else
      this.next.append(node);
    
    return this;
  }

  remove(node){
    if(!(node instanceof DoublyLinkedList))
      throw new TypeError('<node> should be an instance of DoublyLinkedList');
    if(this === node) {
      if(this.next){
        this.next.previous = null;
        return this.next;
      }
      else
        return null;
    }
    if(!this.next)
      return this;
    if(this.next === node){
      this.next = this.next.next;
      //vinicio - this if is necessary
      if(this.next) {
        this.next.previous = this;
      }
    } else {
      this.next.remove(node);
    }
    return this;
  }
  
  find(value) {
    if(value === this.value)
      return this;
    if(this.next === null)
      return null;
    else
      return this.next.find(value);
  }
}


module.exports = DoublyLinkedList;


