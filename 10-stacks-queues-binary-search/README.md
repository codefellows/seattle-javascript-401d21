![cf](http://i.imgur.com/7v5ASc8.png) 10: Linked Lists
===

## Learning Objectives
* students will be able to implement a linked list
* students will be able to implement a doubly linked list
* students will be able create and implement common linked list methods

## Resources
* Watch [linked lists]
* Skim [linked list wiki]

## Overview

![linked-list](https://s3-us-west-2.amazonaws.com/slugbyte-assets/linked-list.svg)

#### Singly Linked List
* there are no FILO/FIFO-style constraints on singly linked lists
  * **FILO** - first in last out
  * **FIFO** - first in first out
* singly linked lists contain a series of nodes where each node contains a value as well as a `next` property - this points to the next node in a line of interconnected nodes
* operations that can be performed on singly linked lists include:
  * insertion (ie: `append` and `prepend` methods)
  * deletion (ie: `remove` method)
  * traversal (ie: `find` method)
* singly linked lists can contain pointers to both the head and the tail, yet this is not a common or simplified implementation and is usually reserved for doubly linked lists

#### Doubly Linked List
* there are no FILO/FIFO-style constraints on doubly linked lists
* doubly linked lists contain a series of nodes where each node contains a value, a `next` property, and a `prev` property - these properties point to the previous and next node in a line of interconnected nodes
* Operations that can be performed on singly linked lists include:
  * insertion (ie: `append` and `prepend` methods)
  * deletion (ie: `remove` method)
  * traversal (ie: `find` method)
* doubly linked lists generally contain pointers to both the head and the tail

#### Whiteboard Exercise (Groups of 3-4)
* **note:**
  * you **may not** use your computer, notes, or the internet to implement the following items
  * once implemented, you **may** use your computer, notes, or the internet to check your work

* **singly linked list**
  * implement a singly linked list constructor
  * implement a `prepend` method - this should prepend a node with a value
  * implement an `append` method - this should append a node with a value
  * **optional:** implement a `remove` method - this should remove a node from the list, keeping the list interconnected after the removal
  * **optional:** implement a `find` method - this should find a node and return the node
  * **stretch:** implement a `findMiddle` method - this should find and return the middle node

* **doubly linked list**
  * implement a doubly linked list constructor
  * implement a `prepend` method - this should prepend a node with a value
  * implement an `append` method - this should append a node with a value
  * **optional:** implement a `remove` method - this should remove a node from the list, keeping the list interconnected after the removal
  * **optional:** implement a `find` method - this should find a node and return the node

[linked lists]: https://www.youtube.com/watch?v=njTh_OwMljA
[linked list wiki]: https://en.wikipedia.org/wiki/Linked_list
