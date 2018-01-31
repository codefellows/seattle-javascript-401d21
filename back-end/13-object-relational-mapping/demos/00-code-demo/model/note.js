'use strict';

const uuid = require('uuid/v4');

module.exports = function Note (title, content) {
  return new Promise((resolve, reject) => {
    if (!title || !content) return reject(new Error('Validation Error: Cannot create Note. Title and Content are required.'));
    this._id = uuid();
    this.title = title;
    this.content = content;
    return resolve(this);  // O(1) Normal Operation (Best Case)
  });
};