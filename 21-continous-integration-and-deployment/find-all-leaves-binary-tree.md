write a function to take in a tree and return an array with all of the leaves in binary tree

```js
// OBJECT ORIENTED APPROACH

class TreeNode {
    constructor(value, left, right){
      this.value = value;
      this.left = left;
      this.right = right;
    }

    toString() {
        return this.value;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    toString() {
        return this._toString(this.root);
    }

    _toString(node) {
        if (!node) {
            return ''
        }
        let leftStr = this._toString(node.left);
        let rightStr = this._toString(node.right);
        return leftStr + ' ' + node.value + ' ' + rightStr;
    }

    findLeaves() {
        let leaves = [];
        this._findLeaves(this.root, leaves);
        return leaves;
    }

    _findLeaves(node, leaves) {
        if (!node) {
            return;
        } else if (!node.left && !node.right) {
            leaves.push(node);
        } else {
            this._findLeaves(node.left, leaves);
            this._findLeaves(node.right, leaves);
        }
    }
}

let tree = new BinaryTree();

let one = new TreeNode(1);
let two = new TreeNode(2);
let three = new TreeNode(3);
let four = new TreeNode(4);
let five = new TreeNode(5);
let six = new TreeNode(6);
let seven = new TreeNode(7);

four.left = two;
two.left = one;
two.right = three;

four.right = six;
six.left = five;
six.right = seven;

tree.root = four;

console.log('Tree: ' + tree);
console.log('Leaves: ' + tree.findLeaves());
```

```javascript
// FUNCTIONAL APPROACH

class BinaryTree{
  constructor(value){
    this.value = value;
    this.left = null;
    this.right = null;
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

const findLeaves = (tree) => {
  if(!(tree instanceof BinaryTree)) return null;
  let leaves = [];

  let reportLeaves = (tree) => {
    if(tree.left == null && tree.right == null) leaves.push(tree);
    if(tree.left !== null) reportLeaves(tree.left);
    if(tree.right !== null) reportLeaves(tree.right);


  }
  reportLeaves(tree);
  return leaves;
}

findLeaves(one)

// time is big O(n)
// space is big O(lg n) the height of the tree

```
