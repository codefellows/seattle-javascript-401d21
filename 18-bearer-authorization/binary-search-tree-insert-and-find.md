Assume that you have a binary search tree constructor available to you.

First, implement insert on a binary search tree.

Second, implement find on a binary search tree.

```javascript

class BinarySearchTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(node) {
    if (!(node instanceof BinarySearchTree))
      throw new Error ('node must be a BST');
    if(node.value === this.value)
      return;
    if(node.value < this.value) {
      if(!this.left) {
        this.left = node;
        return;
      }
      this.left.insert(node);
      return;
    }
    if(!this.right) {
      this.right = node;
      return;
    }
    this.right.insert(node);
  }

  find(value){
    if(value == this.value) return this;

    if(value < this.value) {
      return this.left !== null ? this.left.find(value) : null
    }
    if(value > this.value) {
      return this.right !== null ? this.right.find(value) : null
    }
  }
}

let bst = new BinarySearchTree(15);

bst.insert(new BinarySearchTree(5));
bst.insert(new BinarySearchTree(7));
bst.insert(new BinarySearchTree(9));
bst.insert(new BinarySearchTree(13));

console.log(bst);


bst.find(5);

```
