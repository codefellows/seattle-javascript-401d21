'use strict';

class TreeNode{
  constructor(value,left=null,right=null){
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BST{
  constructor(root=null){
    this.root = root;
  }

  insert(nodeToInsert){
    if(this.root === null)
      this.root = nodeToInsert;
    else
      this._insert(this.root,nodeToInsert);
  }

  _insert(root,nodeToInsert){
    if(nodeToInsert.value < root.value){
      // Vinicio - going left
      if(!root.left)
          root.left = nodeToInsert;
      else
          this._insert(root.left,nodeToInsert);
    } else {
      // Vinicio - going right
      if(!root.right)
        root.right = nodeToInsert;
      else
        this._insert(root.right,nodeToInsert);
    }
  }

  find(value){
    return this._find(this.root,value);

  }

  _find(root,value){
    if(!root)
        return null;
    else if(root.value === value)
      return root;
    else if(root.value < value)
     return this._find(root.right,value);
    else
      return this._find(root.left,value);
  }
}

let bst = new BST();
bst.insert(new TreeNode(5));
bst.insert(new TreeNode(2));
bst.insert(new TreeNode(8));
bst.insert(new TreeNode(16));

console.log(bst.find(8));
console.log(bst.find(16));
console.log(bst.find(100));









