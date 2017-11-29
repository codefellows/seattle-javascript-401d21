'use strict';

const fs = require('fs');

//------------------------------------------------------
let bigFilePath = `${__dirname}/data/big-document.txt`;

fs.readFile(bigFilePath,(error,data) => {
  if(error)
    throw error;
  
  console.log('================================');
  console.log(data.toString('utf-8',0,256));

  // vinicio - I'm moving this here so I can control execution order
  let filePath = `${__dirname}/index.js`;

  fs.readFile(filePath,(error,data) => {
    
    if(error)
      throw error;
    
    console.log('================================');
    console.log(data.toString('utf-8',0,256));
  });
});