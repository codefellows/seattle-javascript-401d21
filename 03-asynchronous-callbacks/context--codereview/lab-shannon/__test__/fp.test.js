'use strict';

const fp = require('../lib/fp');

describe(`fp.test.js`, () => {
  describe(`fp.map function`, () => {
    test(`fp.map should return a new array with each element altered based on the callback function`, () => {
      expect(fp.map(x => x + 1, [1,2,3])).toEqual([2,3,4]);
      //expect(fp.map(x => x + 3, [])).toEqual([]);
      expect(fp.map(x => x * 2, [1,2,3])).toEqual([2,4,6]);
    });
    test(`fp.map should throw a Type Error if the callback provided is not a function`, () => {
      expect(() => {
        fp.map('I am not a function',[1,2,3])
      }).toThrow();
    });
    test(`fp.map should throw an error if the collection provided is not an array`, () => {
      expect(() => {
        fp.map(x => x + 1, 288388383);
      }).toThrow();
    })
  })

  describe(`fp.filter`, () => {
    test(`fp.filter should return a new array with only the elements which fit the specifications provided`, () => {
      expect(fp.filter(num => num > 8, [7,8,9])).toEqual([9]);
      expect(fp.filter(string => string.length > 2, ['a', 'hello', 'eh', 'goodbye'])).toEqual(['hello', 'goodbye']);
    });
    test(`fp.filter should throw a Type Error if the callback provided is not a function`, () => {
      expect(() => {
        fp.filter(`I'm not a function`), [1,2,3]
      }).toThrow();
    })
    test(`fp.filter should throw an error if the collection provided is not an array`, () => {
      expect(() => {
        fp.filter(string => string.length < 8, 'I am not an array')
      }).toThrow();
    })
  })

  describe(`fp.slice`, () => {
    test(`fp.slice should return a portion of the input from the specified start point to end point (not inclusive`, () => {
      expect(fp.slice(0, 4, ['coding', 'is', 'the', 'best', 'ever'])).toEqual(['coding', 'is', 'the', 'best']);
    })
    test(`fp.slice should throw an error if the collection provided is not an array-like object`, () => {
      expect(() => {
        fp.slice(1, 3, 373838383);
      }).toThrow();
    })
    // test(`fp.slice should throw an error if start is not a positive number`, () => {
    //   expect(() => {
    //     fp.slice(-1, 3, [`do`, `you`, `like`, `coding`])
    //   }).toThrow();
    // })
    // test(`fp.slice should throw an error if stop is not a positive number`, () => {
    //   expect(() => {
    //     fp.slice(1, -3, [`do`, `you`, `like`, `coding`])
    //   }).toThrow();
    // })
  })

  describe(`fp.reduce`, () => {
    test(`fp.reduce should return a single value by adding the current element's value in the initial collection onto the starting value provided`, () => {
      expect(fp.reduce((accumulator, currentValue) => {return accumulator + currentValue}, [0,1,2,3], 0)).toEqual(6);
    })
    test(`fp.reduce should throw a Type Error if the callback provided is not a function`, () => {
      expect(() => {
        fp.reduce(`I am not a function!`, [1,2,3])
      }).toThrow();
    })
    test(`fp.reduce should throw an error if the collection provided is not an array`, () => {
      expect(() => {
        fp.reduce((accumulator, currentValue) => {return accumulator + currentValue}, 'I am not an array', 0)
      }).toThrow();
    })
    test(`fp.reduce should throw an error if the accumulator's initial value is not a number`, () => {
      expect(() => {
        fp.reduce((accumulator, currentValue) => {return accumulator + currentValue}, [0,1,2], 'banana')
      }).toThrow();
    })
    test(`fp.reduce should throw an error if one of the elements in the collection is not a number`, () => {
      expect(() => {
        fp.reduce((accumulator, currentValue) => {return accumulator + currentValue}, [1,2,`pie`], 0
      )}).toThrow();
    })
  })
});
