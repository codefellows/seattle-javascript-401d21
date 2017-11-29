'use strict';

const fileReader = module.exports = {};
const fs = require('fs');

fileReader.readFile = (callback) => {
  let bigFilePath = `${__dirname}/../data/big-document.txt`;
  fs.readFile(bigFilePath,(error,data) => {
    if(error)
      callback(error);
  
    callback(null,data.toString('utf-8',0,64));
  });
};

fileReader.notTheRightWay = () => {
  let bigFilePath = `${__dirname}/../data/big-document.txt`;
  return fs.readFile(bigFilePath, (error,data) => {
    if(error)
      return error;
    
    return data.toString('utf-8',0,64);
  });
  //vinicio - this line executes as soon as possible
};