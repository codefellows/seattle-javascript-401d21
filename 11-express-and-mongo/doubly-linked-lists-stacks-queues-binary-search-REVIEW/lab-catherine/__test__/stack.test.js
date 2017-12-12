'use strict';

let StackLinkedList = require('../model/stack');

describe('stack.js', () => {
  test('Stacks should have Last In First Out (LIFO) behavior', () => {
    let stack = new StackLinkedList(1);

    stack.push(2);
    stack.push(3);

    expect(stack.pop()).toEqual(3);
    expect(stack.pop()).toEqual(2);
    expect(stack.pop()).toEqual(1);
    expect(stack.pop()).toEqual(undefined);
  });

  test('If the numbers passed in are reversed, the stack should function properly', () => {
    let stack = new StackLinkedList(3);

    stack.push(2);
    stack.push(1);

    expect(stack.pop()).toEqual(1);
    expect(stack.pop()).toEqual(2);
    expect(stack.pop()).toEqual(3);
    expect(stack.pop()).toEqual(undefined);
  });

  test('Stack should have LIFO behavior when passed a string', () => {
    let stack = new StackLinkedList('c');

    stack.push('a');
    stack.push('t');
    stack.push('s');

    expect(stack.pop()).toEqual('s');
    expect(stack.pop()).toEqual('t');
    expect(stack.pop()).toEqual('a');
    expect(stack.pop()).toEqual('c');
    expect(stack.pop()).toEqual(undefined);
  });

  test('If nothing is passed in, an error will throw', () => {
    let stack = new StackLinkedList('');

    expect(() => stack.pop()
    ).toThrow();
  });
});

let first = 10;
expect(() =>
  first.remove(first)
).toThrow();