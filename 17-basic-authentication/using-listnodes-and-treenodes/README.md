# Using ListNodes and TreeNodes
Previously we've implemented LinkedLists and BinaryTrees using one class to
store both the information in each node in the tree, and to store methods
for the whole list or tree class.

These code samples show how to split representing the list and tree into two
classes. One class will represent the **nodes** in the data structure, the
second class will represent the whole data structure itself. The node classes
are small and have no functionality. The nodes just model how data is stored.
The data structure class manipulates the node classes to add functionality
to the data structure.

Compare the contains method for a BinaryTree in these two different
implementations. Notice how the code is cleaner when the `TreeNode` class is
used.

The implementation without the `TreeNode` requires if statements before ever
calling `this.left.contains(value)` because `this.left` might be `null` and
it's impossible to call `null.contains(value)`.

One motiviation for making `TreeNode` separate from `BinaryTree` is this: don't
attach methods to things that might be null!

```
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
```

```
class BinaryTree {
  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  contains(value) {
    if (this.value === value) {
      return true;
    } else if (!this.left && !this.right) {
      return false
    } else if (value < this.value) {
      if (!this.left) {
        return false
      }
      return this.left.contains(value);
    } else {
      if (!this.right) {
        return false
      }
      return this.right.contains(value);
    }
  }
}
```
