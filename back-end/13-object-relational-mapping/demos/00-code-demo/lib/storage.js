'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

const storage = module.exports = {};


storage.create = (schema, item) => {

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)   // O(1) Normal Operation (Best Case)
    .then(() => item);

};


storage.fetchOne = (schema, id) => {
  return fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`);   // O(1) Normal Operation (Best Case)
};


storage.fetch = (schema) => {
  return fs.readdirProm(`${__dirname}/../data/${schema}`)   // O(n) Normal Operation (Best Case)
    .then(dir => dir.map(file => file.split('.')[0]));
};


storage.update = (schema, id, item) => {
  if (item._id !== id) return Promise.reject(new Error('Validation Error: Cannot update file with unmatched ID'));
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${id}.json`, json)   // O(1) Normal Operation (Best Case)
    .then(() => item);


};


storage.destroy = (schema, id) => {
  return fs.unlinkProm(`${__dirname}/../data/${schema}/${id}.json`);   // O(1) Normal Operation (Best Case)
};
