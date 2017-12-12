class ListNode {
  constructor(value, next){
    this.value = value
    this.next = next
  }

  toString() {
    var str = "";
    var current = this;
    while (current) {
      str += current.value + " ";
      current = current.next;
    }
    return str;
  }
}

ListNode.intersect = (listA, listB) => {
  // start off the result list with a null value
  // so we can easily attach things to .next later.
  let result = new ListNode(null);

  // make a 'current' pointer for each list.
  let currentA = listA;
  let currentB = listB;
  
  // make another pointer to point to the end of the new list.
  let currentC = result;

  // while both current pointers are still non-null
  while (currentA && currentB) {
    if (currentA.value === currentB.value) {
      // build a new node on the end of the result list.
      currentC.next = new ListNode(currentA.value);

      // move all pointers forward one step.
      currentA = currentA.next;
      currentB = currentB.next;
      currentC = currentC.next;
    } else if (currentA.value < currentB.value) {
      // A is lower than B so only step A forward.
      currentA = currentA.next;
    } else if (currentB.value < currentA.value) {
      // B is lower than A so only step B forward.
      currentB = currentB.next;
    }
  }

  // chop off the first null-value node that we started with.
  return result.next;
}


let a = new ListNode(3, new ListNode(4, new ListNode(5)));
let b = new ListNode(3, new ListNode(4, new ListNode(6)));
let c = ListNode.intersect(a, b)

console.log("List A:", a.toString());
console.log("List B:", b.toString());
console.log("List C:", c.toString());
