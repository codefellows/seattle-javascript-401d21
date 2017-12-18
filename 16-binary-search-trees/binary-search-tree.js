'use strict';

class BinarySearchTree{
  constructor(value){
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(value){
    if(typeof value !== 'number')
      throw new TypeError('Binary Search Tree - value should be a number');

    if(this.value === value)
      throw new Error('Binary Search Tree - value is already present');

    if(value < this.value){
      if(!this.left){
        this.left = new BinarySearchTree(value);
        return;
      }
      this.left.insert(value); // vinicio - recursive call
      return;
    }
    if(!this.right){
      this.right = new BinarySearchTree(value);
      return;
    }
    this.right.insert(value);
    return;
  }

  find(value){
    if(value === this.value)
      return this;
    
    // vinicio - checking right sub-tre
    if(value > this.value){
      if(this.right !== null)
        return this.right.find(value);
      else
        return null;
    }
    if(this.left !== null)
      return this.left.find(value);
    else
      return null;
  }
}

let bst = new BinarySearchTree(10);
bst.insert(5);
bst.insert(2);
bst.insert(8);
bst.insert(16);

console.log(bst.find(8));
console.log(bst.find(16));
console.log(bst.find(100));
