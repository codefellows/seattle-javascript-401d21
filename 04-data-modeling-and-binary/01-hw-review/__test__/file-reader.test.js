'use strict';

const fileReader = require('../lib/file-reader');

describe('file-reader.js', () => {

  test('file contents should be returned in order based on input array', (done) => {
    let filePaths = [
      `${__dirname}/../assets/mario.txt`,
      `${__dirname}/../assets/peach.txt`,
      `${__dirname}/../assets/luigi.txt`,
    ];

    fileReader.readFiles(filePaths, (error,data) => {
      expect(error).toBeNull();
      expect(data[0]).toEqual('mario');
      expect(data[1]).toEqual('peach');
      expect(data[2]).toEqual('luigi');
      done();
    });
  });

  test('If the file does not exist, an error will be returned', (done) => {
    let filePaths = [
      `${__dirname}/../assets/mario.txt`,
      `${__dirname}/../assets/peach.txt`,
      `${__dirname}/../assets/luigi.txt`,
    ];

    fileReader.readFiles(filePaths, (error,data) => {
      expect(error).not.toBeNull();
      done();
    });
  });

});

