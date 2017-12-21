class SingleClassBinaryTree{
  constructor(value){
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const compareTree = (one, two) => {
  if(one == null && two == null) return true;
  else if(one !== null && two !== null){
    return compareTree(one.left, two.left) && compareTree(one.right, two.right);
  }
  else return false;
}

let one = new SingleClassBinaryTree(1);
let two = new SingleClassBinaryTree(2);
let three = new SingleClassBinaryTree(3);
let four = new SingleClassBinaryTree(4);
let five = new SingleClassBinaryTree(5);


one.left = two;
one.right = three;

three.left = four;
three.right = five;

console.log("tree1 compared to tree1?", compareTree(one, one));
console.log("tree1 compared to tree3?", compareTree(one, three));
console.log();

class TreeNode {
  constructor(value, left, right){
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  compareTree(other) {
    return this._compareTree(this.root, other.root);
  }

  _compareTree(node1, node2) {
    // both nodes don't exist, so they're the same.
    if (!node1 && !node2) {
      return true;
    } else if (!node1 || !node2) {
      // only one of them doesn't exist, so they're not the same.
      return false;
    } else if (node1.value !== node2.value) {
      // they're not the same because they have different values
      // at the same node position.
      return false;
    } else {
      // otherwise, the nodes up to this point are identical so far,
      // so let's recursively check the left and right.
      return this._compareTree(node1.left, node2.left) &&
             this._compareTree(node1.right, node2.right);
    }
  }
}

one = new TreeNode(1);
two = new TreeNode(2);
three = new TreeNode(3);
four = new TreeNode(4);
five = new TreeNode(5);

one.left = two;
one.right = three;

three.left = four;
three.right = five;

tree1 = new BinaryTree();
tree3 = new BinaryTree();
tree1.root = one;
tree3.root = three;

console.log("tree1 compared to tree1?", tree1.compareTree(tree1));
console.log("tree1 compared to tree3?", tree1.compareTree(tree3));

