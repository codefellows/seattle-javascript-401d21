const reader = require('../lib/reader.js');
const imagePath = `${__dirname}/asset/bitmap.bmp`;
const not_imagePath = `${__dirname}/asset/not_image.txt`;
const wrongBMP_imagePath = `${__dirname}/asset/MARBLES.BMP`;
const bitmap = require('../lib/bitmap.js');



describe('#bitmap test Module', function() {
  it('should return error if buffer is null', (done) => {
    bitmap.parse(null, (err, bmp) => {
      if(err) console.error(err);
      expect(err).not.toBeNull();
      done();
    });
  });
  it('should return object when passed a buffer', (done) => {
    reader.read(imagePath, (err, data) => {
      bitmap.parse(data, (err, bmp) => {
        if(err) console.error(err);
        expect(bmp).toBeInstanceOf(Object);
        done();
      });
    });
  });
  it('should return an error when passed a buffer that is not from a bitmap', (done) => {
    reader.read(not_imagePath, (err, data) => {
      bitmap.parse(data, (err, bmp) => {
        if(err) console.error(err);
        expect(err).not.toBeNull();
        done();
      });
    });
  });
  // it('should return an error when passed a buffer that is not from a windows bitmap of the proper format', (done) => {
  //   reader.read(wrongBMP_imagePath, (err, data) => {
  //     bitmap.parse(data, (err, bmp) => {
  //       if(err) console.error(err);
  //       expect(err).not.toBeNull();
  //       done();
  //     });
  //   });
  // });
});