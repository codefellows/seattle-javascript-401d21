'use strict';

class DoublyLinkedList{
  //new LinkedList()...
  constructor(value){
    this.value = value;
    this.next = null;
    this.previous = null;
  }

  append(node){
    if(!(node instanceof DoublyLinkedList))
      throw new TypeError('<node> should be an instance of DoublyLinkedList');
    
    // vinicio - we know we are at the last element if there is no next
    if(!this.next){
      this.next = node;
      node.previous = this;
    }
    else
      this.next.append(node);
    
    return this;
  }
}

module.exports = DoublyLinkedList;