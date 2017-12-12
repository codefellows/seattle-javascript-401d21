'use strict';

const binarySearch = require('../model/binary-search');

describe('binary-search.js', () => {
  const sampleArray = [
    {id: 0, name: 'Mooshy'},
    {id: 1, name: 'Chibi'},
    {id: 2, name: 'Lola'},
  ];

  test('binary search should return the specific object based on the id input', () => {
    expect(binarySearch(sampleArray, 0)).toEqual({id: 0, name: 'Mooshy'});    
    expect(binarySearch(sampleArray, 1)).toEqual({id: 1, name: 'Chibi'});
    expect(binarySearch(sampleArray, 2)).toEqual({id: 2, name: 'Lola'});
  });

  test('If there is no corresponding id, -1 will be returned', () => {
    expect(binarySearch(sampleArray, 4)).toEqual(-1);
  });

  test('The first argument passed in (sortedObjectArray) must be an array', () => {
    expect(() => 
      binarySearch ('Not an array', 2)
    ).toThrow();
  });

  test('The second argument passed in (itemToFind) must be a number', () => {
    expect(() => 
      binarySearch (sampleArray, 'Not a number')
    ).toThrow();
  });
});