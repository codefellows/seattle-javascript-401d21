![cf](http://i.imgur.com/7v5ASc8.png) 10: Doubly Linked Lists, Stacks, Queues, Binary Search
===

## Learning Objectives
* students will be able to implement a doubly linked list
* Students will be able to implement a stack
* Students will be able to identify use cases for a stack
* Students will be able to implement a queue
* Students will be able to identify use cases for a queue
* Students will understand the inner workings or Binary Search

## Resources
* Read [YDKJS: This and Object Prototypes](https://github.com/getify/You-Dont-Know-JS/tree/master/this%20%26%20object%20prototypes)
* Watch [stacks and queues](https://www.youtube.com/watch?v=wjI1WNcIntg)
* Read [stack wiki](https://en.wikipedia.org/wiki/Stack_(abstract_data_type))
* Skim [queue wiki](https://en.wikipedia.org/wiki/Queue_(abstract_data_type))

#### Doubly Linked List
* there are no FILO/FIFO-style constraints on doubly linked lists
* doubly linked lists contain a series of nodes where each node contains a value, a `next` property, and a `prev` property - these properties point to the previous and next node in a line of interconnected nodes
* Operations that can be performed on singly linked lists include:
  * insertion (ie: `append` and `prepend` methods)
  * deletion (ie: `remove` method)
  * traversal (ie: `find` method)
* doubly linked lists generally contain pointers to both the head and the tail

#### Stacks
Stacks are a data structure that serve as a collection of elements. These elements are stacked in a last in, first out sequence **(aka LIFO - last in first out)**. It may help to think about a stack as a collection of plates and the way that you add and remove them.

Stacks are often used for:
  * history capability with undo functionality
  * call stack management

Common methods include:
  * `pop` removes the most recent element from the stack
  * `push` adds a new element to the stack

#### Queues
Queues are also a data structure that serve as a collection of elements. Elements in a queue are added in a first in, first out sequence **(aka FIFO - first in first out)**. It may help to think about a queue as a bunch of people standing in line at a concert - the first person in line is the first person in the venue.

Common methods include:
  * `enqueue` is used to add an element to the end of a queue
  * `dequeue` is used to retrieve and remove an element from the beginning of a queue
