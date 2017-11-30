'use strict';

const fs = require('fs');

const fileReader = module.exports = {};


fileReader.readFiles = (paths,callback) => {
  let results = [];

  function readFilesRecursively(){
    // vinicio - this is the base case to stop the recursion
    if(paths.length === 0)
      callback(null,results);
    else
      fs.readFile(paths.shift(),(error,data) => {
        //vinicio - inside this callback, I have the file or an error
        if(error)
        {
          callback(error); //!! return error;
          return;
        }

        results.push(data.toString());
        readFilesRecursively();
      });
  }
  readFilesRecursively();
};