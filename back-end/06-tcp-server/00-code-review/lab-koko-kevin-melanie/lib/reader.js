'use strict';

const fs = require('fs');
const reader = module.exports = {};

reader.read = function(path, callback) {
  fs.readFile(path, (err, fd) => {
    if(err) {
      console.error(err);
      return callback(err);
    }
    return callback(null, fd);
  });
};

reader.write = function(bmpObj, filePath, callback) {
  fs.writeFile(filePath, bmpObj.allData, err => {
    if(err) return callback(err);
    console.log(`File created: ${filePath}`);
    return callback(null);
  });
};
