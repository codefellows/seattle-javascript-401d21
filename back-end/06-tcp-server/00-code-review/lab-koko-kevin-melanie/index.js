#!/usr/bin/env node
'use strict';
const start = module.exports = {};

const reader = require('./lib/reader.js');
const bitmap = require('./lib/bitmap.js');
const transform = require('./lib/transform.js');

start.processImage = function(args) {
  if(args.length < 5) {
    let arg_err = 'Invalid arguments - Expecting: <file-Path> <new-file-name> <transform-method>';
    console.log(arg_err);
    // process.stdOut.write()
    return arg_err;
  }

  let [imagePath, newName, tm] = args.slice(2);
  let imgDir = imagePath.split('/').slice(0, -1).join('/');
  let newPath = `${imgDir}/${newName}.bmp`;

  if(!transform.hasOwnProperty(tm)) {
    let method_error = 'Invalid transform method - Expecting one of: <random> <invert> <reverse> <boostGreen> <boostRed> <boostBlue> <redChannel> <blackWhite> <invert2> <invert3> <invert4>';
    console.log(method_error);
    return method_error;
  }

  reader.read(imagePath, (err, fd) => {
    if(err) return err;
    bitmap.parse(fd, (err, bmp) => {
      if(err) err; // return err?
      transform[tm](bmp, (err, bmp) => {
        if(err) err; // return err?
        reader.write(bmp, newPath, err => {
          if(err) err; // return err?
        });
      });
    });
  });
};

start.processImage(process.argv);
