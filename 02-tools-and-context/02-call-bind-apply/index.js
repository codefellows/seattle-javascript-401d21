'use strict';

const uuidv1 = require('uuid/v1');

function TagObject(name = '', age = 0){
  this.id = uuidv1();
  this.timestamp = new Date();
  this.name = name;
  this.age = age;
}
//------------------------------------------
// Using New
//------------------------------------------
// vinicio - `this` will be {} because I used new
// let taggedObject = new TagObject(); 
// console.log(taggedObject);
//------------------------------------------
// Using Call
//------------------------------------------
// let myCustomContext = {
//   extraContextValue : 'I was assigned earlier in the code!!',
// };
// console.log(myCustomContext);
// console.log('-----------------');
// TagObject.call(myCustomContext); // vinicio - using default arguments
// TagObject.call(myCustomContext,'Mario',30); // vinicio - using arguments
// //TagObject.call(null); // vinicio - this will break because this will be null
// console.log(myCustomContext);
//------------------------------------------
// Using Apply
//------------------------------------------
// let myCustomContext = {
//   extraContextValue : 'I was assigned earlier in the code!!',
// };
// //TagObject.apply(myCustomContext,['Mario',30]); //vinicio - using arguments
// TagObject.apply(myCustomContext,[]); //vinicio - using default values
// console.log(myCustomContext);
//------------------------------------------
// Using Apply
//------------------------------------------
// let contextToBeBound = {};
// let boundTaggedObject = TagObject.bind(contextToBeBound);

// console.log(contextToBeBound);
// console.log('--------FIRST CALL---------');
// boundTaggedObject();
// console.log(contextToBeBound);
// console.log('--------SECOND CALL--------');
// boundTaggedObject();
// console.log(contextToBeBound);
//!! TagObject('Mario', 30); vinicio - this will not work since it's unbound
//------------------------------------------
// BAD PRACTICE - Using the default scope
//------------------------------------------
// vinicio - this requires 'use strict' to be uncommented
//!! TagObject();
//!! console.log(id);
//!! console.log(timestamp);
//------------------------------------------