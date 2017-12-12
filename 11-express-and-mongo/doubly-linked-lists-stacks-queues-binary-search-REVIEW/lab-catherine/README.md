# Code Fellows: Seattle 401 JavaScript - 401d19


##  Lab 10: Doubly Linked List, Binary Search, Stacks, and Queues

### Author:
 Catherine Looper

### Motivation

In this project, I built a Doubly Linked List module containing append, remove, and find methods. I then applied those concepts to construct a stack data structure model using Doubly Linked Lists. This project also includes a binary search module that accepts an array of objects and an item to find as its parameters.

### Build

#### Doubly Linked List Module

The Doubly Linked List module contains a class called DoublyLinkedList that is being exported from the module. This class contains an append method that accepts a node as a parameter and adds it to the end of the doubly linked list. The class also contains a remove method that removes a node from the linked list. Finally, I included a find method that accepts a value and searches for the node containing that value.


#### Stack Module

The stack module contains a class called StackLinkedList that is being exported from the module. This class contains an append method that accepts a node as a parameter and adds it to the end of the doubly linked list. The class also contains a push method that accepts a value and calls the append method to add a new value to the linked list. Finally, the class contains a method called pop that serves to remove a value from the end of the doubly linked list in order to model the LIFO properties of stacks.

#### Binary Search Module

The Binary Search module is a version of a binary search that accepts an array of objects as its first argument, and an integer as its second. A binary search should be conducted with an id and return the object in the array based on that id. If the id does not exist then -1 will be returned.

#### Queue Module

There is a queue module in place that functions with arrays and has not yet been refactored using doubly linked lists.


### Limitations

To use this app - it is assumed that the user has familiarity with the tech and frameworks listed below. 

### Code Style

Standard JavaScript with ES6

### Tech/Framework used

* JavaScript / ES6
* Node.js
* Jest
* Eslint

### How to use?

* Step 1. Fork and Clone the Repository.
* Step 2. ```npm install```.
* Step 3. to test the API run the command ```npm run test```.

### Credits

* Code Fellows / Vinicio Vladimir Sanchez Trejo for providing the demo code as reference.

### License

MIT © Catherine Looper