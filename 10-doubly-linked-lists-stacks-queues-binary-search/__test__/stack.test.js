'use strict';

let stackFactory = require('../lib/stack');

describe('stack.js', () => {
  test('Stacks should have LIFO behavior', () => {
    let stack = stackFactory.createStack();

    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.pop()).toEqual(3);
    expect(stack.pop()).toEqual(2);
    expect(stack.pop()).toEqual(1);
    expect(stack.pop()).toEqual(undefined);
  });
});