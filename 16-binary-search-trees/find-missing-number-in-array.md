You have an integer array which contains numbers from 1 to 100 but one number is missing, you need to write a function `calculateMissing = (array) => {...}` to find that missing number in an array.

* One trick to solve this problem is to calculate sum of all numbers in the array and compare with expected sum, the difference would be the missing number.

```js
// Vinicio's solution
const findMissingNumberMath = (array) => {

  let totalItems = 100;
  let firstNumber = 1;
  let lastNumber = 100;
  let totalExpectedSum = (totalItems / 2) * (firstNumber + lastNumber); // arithmetic progression

  let actualSum  = array.reduce((acc, cur) => acc + cur);

  return totalExpectedSum - actualSum;
};

big O(1) // space
big O(n) // time
```

* This solution demonstrates how to create an array with the numbers 1-100 in a novel way.

```javascript
// function to calculate missing number in an array of numbers 1 - 100
// this makes an array with numbers 1 to 100 comma separated
// then it maps over that array
// then it reduces the array and adds each number together
// gives us the sum of numbers 1 to 100 (5151)

// Izzy's solution
const test = [...Array(99).keys()].map(x => ++x);

const findNumber = (array) => {
  const expectedSum = [...Array(100).keys()].map(x => ++ x).reduce((a, c) => a + c); // gives us 5050
  // expectedSum is what we want the sum to be

  const actualSum = array.reduce((a, c) => a + c); // gives us 4950
  // actualSum is what the actual sum of the array passed in is

  let missingNumber = expectedSum - actualSum;
  return missingNumber;
}

findNumber(test);
// gives us 100

big O(n)


// on line 13 we are creating an array that contains numbers 1 to 100
// we are using the spread operator with the .keys() function
// then we are mapping over the numbers in the array and getting rid of 0
// then we are reducing and adding each value together to get the expectedSum
```
