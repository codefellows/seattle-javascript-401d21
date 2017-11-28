'use strict';

const greet = require('./lib/greet');

try{
  greet.hi('Mario');
  greet.hi('Mario');
  greet.hi('Mario');
  greet.hi('Mario');
  greet.hi('Mario');
  greet.hi('Mario');
  greet.hi('Mario');
  greet.hi(2828282);
  greet.hi(2828282);
  greet.hi(2828282);
  greet.hi(2828282);
  greet.hi(2828282);
  greet.hi(2828282);
  greet.hi(2828282);
  //...
}catch(e){
  console.log(e);
}
finally{
  console.log('Finally');
}