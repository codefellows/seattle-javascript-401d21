'use strict';

module.exports = class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }

  //vinicio - encapsulating error checking to a single function
  _checkNode(node) {
    if (!(node instanceof LinkedList))
      throw new TypeError('__LINKED_LIST_ERROR__ node must be a LinkedList');
  }

  append(node) {
    this._checkNode(node);

    if (!this.next) {
      this.next = node;
    } else {
      this.next.append(node);
    }
    return this;
  }

  remove(node) {
    this._checkNode(node);

    if (this === node) {
      return this.next;
    } else if (!this.next) {
      return this;
    } else if (this.next === node) {
      this.next = this.next.next;
    } else {
      this.next.remove(node);
    }
    return this;
  }

  find(predicate) {
    if (typeof predicate !== 'function') {
      throw new TypeError('__LINKED_LIST_ERROR__ predicate should be a function');
    }
    if (predicate(this) === true) {
      return this;
    } else if (this.next) {
      return this.next.find(predicate);
    } else {
      return null;
    }
  }
};