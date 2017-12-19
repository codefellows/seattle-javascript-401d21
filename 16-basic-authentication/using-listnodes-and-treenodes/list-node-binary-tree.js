class TreeNode {
  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}
class BinaryTree {
  constructor() {
    this.root = null;
  }
  
  add(value) {
    if (this.root === null) {
      this.root = new TreeNode(value);
    } else {
      this._add(this.root, value);
    }
  }
  
  _add(node, value) {
    if (value < node.value) {
      if (!node.left) {
        node.left = new TreeNode(value);
      } else {
        this._add(node.left, value);
      }
    } else {
      if (!node.right) {
        node.right = new TreeNode(value);
      } else {
        this._add(node.right, value);
      }
    }
  }
  
  contains(value) {
    return this._contains(this.root, value);
  }
  
  _contains(node, value) {
    if (!node) {
      return false;
    } else if (node.value === value) {
      return true;
    } else if (value < node.value) {
      return this._contains(node.left, value);
    } else {
      return this._contains(node.right, value);
    }
  }
}

//    5
//  2  8
// 1
b1 = new BinaryTree(5);
b1.add(2)
b1.add(1)
b1.add(8)

console.log("TreeNode has 5?", b1.contains(5));
console.log("TreeNode has 1?", b1.contains(1));
console.log("TreeNode has 2?", b1.contains(2));
console.log("TreeNode has 8?", b1.contains(8));
console.log("TreeNode has -1?", b1.contains(-1));
console.log("TreeNode has 3?", b1.contains(3));
console.log();
