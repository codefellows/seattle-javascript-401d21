class ListNode {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}
class LinkedList {
  constructor() {
    this.root = null;
  }
  
  isEmpty() {
    return this.root === null;
  }
  
  toString() {
    return this._toString(this.root);
  }
  _toString(node) {
    if (!node) {
      return '';
    }
    return node.value + ' ' + this._toString(node.next);
  }
}

ll = new LinkedList();
ll.root = new ListNode(1, new ListNode(2, new ListNode(3)));
l2 = new LinkedList();
console.log("ListNode", ll.toString());
console.log("ListNode Empty:", ll.isEmpty());
console.log("ListNode Empty:", l2.isEmpty());
console.log();
