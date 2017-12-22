'use strict';

const faker = require('faker');
const awsSdkMock = require('aws-sdk-mock');

process.env.PORT = 7000;
process.env.MONGODB_URI = 'mongodb://localhost/testing';
process.env.CAT_CLOUD_SECRET = 'supersecretcatpassword';

process.env.AWS_BUCKET = 'fakebucket';
process.env.AWS_ACCESS_KEY_ID = 'fakeid';
process.env.AWS_SECRET_ACCESS_KEY = 'fakekey';

awsSdkMock.mock('S3', 'upload', (params, callback) => {
  if (!params.Key || !params.Bucket || !params.Body || !params.ACL){
    return callback(new Error('__ERROR__', 'key, bucket, body and ACL are required'));
  }

  if (params.ACL !== 'public-read'){
    return callback(new Error('__ERROR__', 'ACL should be public-read'));
  }

  if (params.Bucket !== process.env.AWS_BUCKET) {
    return callback(new Error('__ERROR__', 'wrong bucket'));
  }

  if(!process.env.AWS_ACCESS_KEY_ID)
    return callback(new Error('__ERROR__ no access key'));

  callback(null, {Location: faker.internet.url()});
});

awsSdkMock.mock('S3', 'deleteObject', (params, callback) => {
  if (!params.Key || !params.Bucket) {
    return callback(new Error('__ERROR__', 'key and bucket are required'));
  }

  if (params.Bucket !== process.env.AWS_BUCKET) {
    return callback(new Error('__ERROR__', 'wrong bucket'));
  }

  callback(null, {});
});