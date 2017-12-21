'use strict';

const fs = require('fs-extra');
const aws = require('aws-sdk');
const amazonS3 = new aws.S3();

const s3 = module.exports = {};

s3.upload = (path,key) => {// vinicio - this returns a promise (because we coded it :p)
  let uploadOptions = {
    Bucket : process.env.AWS_BUCKET,
    Key : key,
    ACL : 'public-read',
    Body : fs.createReadStream(path),
  };
  return amazonS3.upload(uploadOptions)
    .promise()// vinicio - this is calling the internal callback
    .then(response => {// vinicio - this is coming from AWS
      return fs.remove(path)
        .then(() => response.Location)
    })
    .catch(error => {
      return fs.remove(path)
        .then(() => Promise.reject(error));
    });
};

s3.remove = (key) => {
  let removeOptions = {
    Key : key,
    Bucket : process.env.AWS_BUCKET,
  };
  return amazonS3.deleteObject(removeOptions).promise();
};