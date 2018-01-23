'use strict';

const reader = require('../lib/reader.js');
const imagePath = `${__dirname}/asset/bitmap.bmp`;
const newPath = `${__dirname}/asset/test-bitmap.bmp`;
const badPath = `${__dirname}/assets/test-bitmap.bmp`;
const bitmap = require('../lib/bitmap.js');
const transform = require('../lib/transform.js');
const fs = require('fs');
require('jest');

describe('Reader Module', function() {
  describe('#Read', () => {
    it('should read file', (done) => {
      reader.read(imagePath, (err, fd) => {
        if(err) console.error(err);
        expect(fd).not.toBeNull();
        done();
      });
    });

    it('should not read a file if it does not exist', (done) => {
      reader.read(badPath, (err, fd) => {
        if(err) console.error(err);
        expect(err).not.toBeNull();
        done();
      });
    });

    it('should error if file path is missing.', (done) => {
      reader.read('', (err, fd) => {
        if(err) console.error(err);
        expect(err).not.toBeNull();
        done();
      });
    });
  });

  describe('#Write', () => {
    it('should create a new file', (done) => {
      reader.read(imagePath, (err, fd) => {
        if(err) console.error(err);
        expect(fd).not.toBeNull();
        bitmap.parse(fd, (err, bmp) => {
          if(err) console.error(err);
          reader.write(bmp, newPath, err => {
            if(err) return console.error(err);
            expect(fs.existsSync(newPath)).toBe(true);
            done();
          });
        });
      });
    });

    it('should write data to a new file', (done) => {
      reader.read(imagePath, (err, fd) => {
        let original_data = fd;
        if(err) console.error(err);
        expect(fd).not.toBeNull();
        bitmap.parse(fd, (err, bmp) => {
          if(err) console.error(err);
          reader.write(bmp, newPath, err => {
            if(err) return console.error(err);
            reader.read(imagePath, (err, fd) => {
              let new_data = fd;
              expect(Buffer.compare(original_data, new_data)).toBe(0);
              done();
            });
          });
        });
      });
    });


    it('should not write a new file if the directory does not exist', (done) => {
      reader.read(imagePath, (err, fd) => {
        if(err) console.error(err);
        expect(fd).not.toBeNull();
        bitmap.parse(fd, (err, bmp) => {
          if(err) console.error(err);
          reader.write(bmp, badPath, err => {
            if(err) console.error(err);
            expect(err).not.toBeNull();
            done();
          });
        });
      });
    });

  });
  describe('#Bitmap', () => {
    it('should read file and create new bmp object', (done) => {
      reader.read(imagePath, (err, fd) => {
        if(err) console.error(err);
        expect(fd).not.toBeNull();
        bitmap.parse(fd, (err, bmp) => {
          if(err) console.error(err);
          expect(bmp).not.toBeNull();
          done();
        });
      });
    });
  });
  describe('#Transform', () => {
    it('should write a changed file', (done) => {
      reader.read(imagePath, (err, fd) => {
        if(err) console.error(err);
        bitmap.parse(fd, (err, bmp) => {
          if(err) console.error(err);
          let original = bmp.allData;
          transform.reverse(bmp, (err, bmpNew) => {
            if(err) console.error(err);
            let altered = bmpNew.allData;
            reader.write(bmpNew, newPath, err => {
              if(err) return console.error(err);
              expect(Buffer.compare(original, altered)).toBe(0);
              done();
            });
          });
        });
      });
    });
  });
});
