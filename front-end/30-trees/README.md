![cf](http://i.imgur.com/7v5ASc8.png) 30: Trees
===


## Learning Objectives
* Students will learn about the tree data structure

## Readings
* Watch [Binary Search Trees](https://www.youtube.com/watch?v=oSWTXtMglKE)

## What is a Tree?

Trees are a widely used data structure that simulate a hierarchical "tree" structure. These data structures contain a **root**, which may or may not contain a series of child sub-trees. They can also be defined recursively as a collection of nodes, which starts at the root node and each node is a data structure consisting of a value and an array of references to any child nodes. Trees are also considered to be a directed, acyclic, connected graph.

## Breaking Down A Tree
  * **root:** - the top node in a tree
  * **child:** - a node that's a direct sub-tree of another node
  * **siblings:** - a group of nodes with the same parent
  * **leaf:** - a node with node children

## K-ary tree
* A k-ary tree is a tree where each node has no more than K-children
* A complete k-ary tree is a tree where every depth level is filled out completely, before the next level can receive any nodes
* A perfect k-ary tree is a tree where all leaf nodes are the same depth

## What is a Binary Search Tree (BST)?
  * **Overview**
    * a binary search tree is a special type of binary tree that allows for insertions and deletions for a tree that is always sorted
    * in a binary search tree, each left child node is smaller than it's parent node and each right child node is greater than it's parent node
      * **note:** *this is a key feature of creating and working with binary search trees*

  * **Node Insertion**
    * in order to insert a new node, the process starts by comparing the new value to the that of the root node
    * if the value is smaller than the root node, we move onto the left branch - if the value is greater, we move on to the right branch
    * this method should work it's way down the tree until there is an empty spot where we can insert the new value
      * **note:** *there is always 1 possible place where a new node can be inserted - using the method from above, this should take **O(H)** time - H representing the height of the tree*

  * **Searching the Tree**
    * in order to search a binary tree for a specific value, we take the same approach as the insertion method discussed above
    * if the value is less than the node we are searching for, go left
    * if the value is greater than the node we are searching for, go right
    * if the value is equal to the node we are searching for, the node has been found and we're done with the search

  * **Deleting a Node**
    * in order to delete a node from the tree, we first remove the node, then replace the node with it's biggest child node on the left or it's smaller child node on the right
      * this ensures that the tree is still sorted after the removal


## Tree Traversals
### Pre-order
* Check if the current node is empty / null.
* Display the data part of the root (or current node).
* Traverse the left subtree by recursively calling the pre-order function.
* Traverse the right subtree by recursively calling the pre-order function.

### Post-Order
* Check if the current node is empty / null.
* Traverse the left subtree by recursively calling the post-order function.
* Traverse the right subtree by recursively calling the post-order function.
* Display the data part of the root (or current node).

### In-Order
* Check if the current node is empty / null.
* Traverse the left subtree by recursively calling the in-order function.
* Display the data part of the root (or current node).
* Traverse the right subtree by recursively calling the in-order function.

## Useful Implementations of Trees**
  * the DOM
  * a computer file system
  * sorting and searching