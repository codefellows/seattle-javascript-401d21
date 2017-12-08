'use strict';

let binarySearch = (sortedArray,itemToFind) => {
  let lowIndex = 0;
  let highIndex = sortedArray.length -1;
  //--------------------------------------------
  let steps = 0;
  //--------------------------------------------

  while(lowIndex <= highIndex){
    //--------------------------------------------
    steps++;
    console.log(`Number of steps so far : ${steps}`);
    //--------------------------------------------

    let middleIndex = Math.floor((lowIndex + highIndex) / 2);
    let elementFound = sortedArray[middleIndex];
    
    if(elementFound < itemToFind){// vinicio - I need to go to the right
      lowIndex = middleIndex + 1;
    }else if(elementFound > itemToFind){ // vinicio - I need to go left
      highIndex = middleIndex -1;
    }else{
      return middleIndex;
    } 
  }
  return -1;
};

// vinicio - a different way of exporting
module.exports = binarySearch;