class LinkedList {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
  
  isEmpty() {
    return !this.value;
  }
  
  toString() {
    if (this) {
      console.log(this.value);
      if (this.next) {
        this.next.toString()
      }
    }
  }
}

ll = new LinkedList(1, new LinkedList(2, new LinkedList(3)));
l2 = new LinkedList();
console.log(ll.toString());
console.log("OldList Empty:", ll.isEmpty());
console.log("OldList Empty:", l2.isEmpty());
console.log();
