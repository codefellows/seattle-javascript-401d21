compare two binary trees in order or any traversal as long as the nodes are the same in both traversals

if the nodes are the same return true

if the nodes are not the same return false

```javascript

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

const compareTree = (one, two) => {
  if(one == null && two == null) return true;
  else if(one !== null && two !== null){
    return compareTree(one.left, two.left) && compareTree(one.right, two.right);
  }
  else return false;
}

compareTree(one, one);
```
