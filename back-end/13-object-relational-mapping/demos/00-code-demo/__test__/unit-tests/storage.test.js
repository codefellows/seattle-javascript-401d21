'use strict';

let storage = require('../../lib/storage');
let fs = require('fs');
require('jest');

let testData = { title: 'testdatarun', content: 'test data run', _id: 'testdatafile' };
let testUpdate = { title: 'testupdaterun', content: 'test data run', _id: 'testdatafile' }
let testWrong = { title: 'testwrongrun', content: 'test data run', _id: 'invalidid'}
storage.create('Note', testData);
describe('Storage Module', () => {
  describe('#create', () => {
    it('Should create a file if passed valid arguments', () => {
      expect(fs.readdirSync(`${__dirname}/../../data/Note`)).toContain('testdatafile.json');
    });
  });
  describe('#update', () => {
    it('Should properly update the file given new information', () => {
      return storage.update('Note', testData._id, testUpdate)
        .then(file => {
          expect(file.title).toBe('testupdaterun');  
        });
    });
    it('Should return a validation error if the id in the file does not match the requested file', () => {
      return storage.update('Note', testData._id, testWrong)
        .catch(err => {
          expect(err).toBeInstanceOf(Error);
        });
    });
  });
  describe('#fetch', () => {
    it('Should return an array of file names', () => {
      return storage.fetch('Note')
        .then(file => {
          expect(Array.isArray(file)).toBeTruthy();
        });
    });
  });
  describe('#fetchOne', () => {
    it('Should return valid data contained in a specific file', () => {
      return storage.fetchOne('Note', testData._id)
        .then(file => {
          file = JSON.parse(file.toString());
          expect(file.content).toBe('test data run');
        });
    });
  });
  describe('#destroy', () => {
    it('Should successfully delete a file from the storage directory', () => {
      return storage.destroy('Note', testData._id)
        .then(() => {
          return storage.fetch('Note')
            .then(files => {
              expect(files).not.toContain('testdatafile');
            });
        });
    });
  });
});