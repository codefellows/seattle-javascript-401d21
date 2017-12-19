'use strict';

class BinaryTree{
  constructor(value){
    this.value = value;
    this.left = null;
    this.right = null;
    //this.parent = ...; // vinicio - this implementation won't have a parent property
  }
}

let one = new BinaryTree(1);
let two = new BinaryTree(2);
let three = new BinaryTree(3);
let four = new BinaryTree(4);
let five = new BinaryTree(5);


one.left = two;
one.right = three;

three.left = four;
three.right = five;

let preOrderTraversal = (root) => {

  if(root === null)
    return;

  console.log(`Visiting ${root.value}`);
  preOrderTraversal(root.left);
  preOrderTraversal(root.right);
};

let postOrderTraversal = (root) => {

  if(root === null)
    return;

  postOrderTraversal(root.left);
  postOrderTraversal(root.right);
  console.log(`Visiting ${root.value}`);
};

postOrderTraversal(one);