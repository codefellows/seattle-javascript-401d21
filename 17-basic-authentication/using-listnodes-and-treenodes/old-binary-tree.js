class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  
  add(value) {
    if (value < this.value) {
      if (!this.left) {
        this.left = new BinaryTree(value);
      } else {
        this.left.add(value);
      }
    } else {
      if (!this.right) {
        this.right = new BinaryTree(value);
      } else {
        this.right.add(value);
      }
    }
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

//    5
//  2  8
// 1
b1 = new BinaryTree(5);
b1.add(2)
b1.add(1)
b1.add(8)

console.log("OldTree has 5?", b1.contains(5));
console.log("OldTree has 1?", b1.contains(1));
console.log("OldTree has 2?", b1.contains(2));
console.log("OldTree has 8?", b1.contains(8));
console.log("OldTree has -1?", b1.contains(-1));
console.log("OldTree has 3?", b1.contains(3));
console.log();
