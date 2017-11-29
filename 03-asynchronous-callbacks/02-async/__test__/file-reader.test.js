'use strict';

const fileReader = require('../lib/file-reader');

describe('file-reader.test.js', () => {
  test('the first 64 characters of the file should be returned if there are no errors', (done) => {

    fileReader.readFile((error,data) => {
      expect(error).toBeNull();
      expect(data).toEqual('Stare out the window refuse to leave cardboard box so rub face o');
      done();
    });
  });
});

