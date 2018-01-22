const reader = require('../lib/reader.js');
const imagePath = `${__dirname}/asset/bitmap.bmp`;
const bitmap = require('../lib/bitmap.js');
const transform = require('../lib/transform.js');



describe('#Transform module tests', function() {

  describe('#Transform.random tests', function() {
    it('should return error message if the object was not created by the Bmp constructor', (done) => {
      transform.random({some: 'thing'}, (err, bmp) => {
        if(err) console.error(err);
        expect(err).toBe('This is not a valid bitmap object');
        done();
      });
    });

    it('should return error message if the object is missing the pixelArray or pixelColor  properties', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          delete bmp.pixelArray;
          delete bmp.colorArray;
          transform.random(bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(err).toBe('This is not a valid bitmap object');
            done();
          });
        });
      });
    });

    it('should return error message if the object is missing values for the pixelArray or pixelColor  properties', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          bmp.pixelArray = null;
          bmp.colorArray = null;
          transform.random(bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(err).toBe('This is not a valid bitmap object');
            done();
          });
        });
      });
    });

    it('should modify the colorArray of the bitmap image.', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          let orgColorArray = Buffer.from(bmp.colorArray);
          transform.random(bmp, (err, bmp) => {
            if(err) console.error(err);
            let modColorArray = Buffer.from(bmp.colorArray);
            expect(Buffer.compare(orgColorArray, modColorArray)).not.toBe(0);
            done();
          });
        });
      });
    });
  });

  describe('#Transform.invert tests', function() {
    it('should return error message if the objet was not created by the Bmp constructor', (done) => {
      transform.invert({some: 'thing'}, (err, bmp) => {
        if(err) console.error(err);
        expect(err).toBe('This is not a valid bitmap object');
        done();
      });
    });

    it('should return error message if the object is missing the pixelArray or pixelColor  properties', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          delete bmp.pixelArray;
          delete bmp.colorArray;
          transform.invert(bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(err).toBe('This is not a valid bitmap object');
            done();
          });
        });
      });
    });

    it('should return error message if the object is missing values for the pixelArray or pixelColor  properties', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          bmp.pixelArray = null;
          bmp.colorArray = null;
          transform.invert(bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(err).toBe('This is not a valid bitmap object');
            done();
          });
        });
      });
    });

    it('should modify the colorArray of the bitmap image.', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          let orgColorArray = Buffer.from(bmp.colorArray);
          transform.invert(bmp, (err, bmp) => {
            if(err) console.error(err);
            let modColorArray = Buffer.from(bmp.colorArray);
            expect(Buffer.compare(orgColorArray, modColorArray)).not.toBe(0);
            done();
          });
        });
      });
    });

    it('should invert the colorArray of the bitmap image.', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          let orgColorArray = Buffer.from(bmp.colorArray);
          transform.invert(bmp, (err, bmp) => {
            if(err) console.error(err);
            let modColorArray = Buffer.from(bmp.colorArray);
            expect(orgColorArray.every((bit, i) => bit + modColorArray[i] === 255)).toBe(true);
            done();
          });
        });
      });
    });

  });

  describe('#Transform.reverse tests', function() {
    it('should return error message if the objet was not created by the Bmp constructor', (done) => {
      transform.reverse({some: 'thing'}, (err, bmp) => {
        if(err) console.error(err);
        expect(err).toBe('This is not a valid bitmap object');
        done();
      });
    });

    it('should return error message if the object is missing the pixelArray or pixelColor  properties', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          delete bmp.pixelArray;
          delete bmp.colorArray;
          transform.reverse(bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(err).toBe('This is not a valid bitmap object');
            done();
          });
        });
      });
    });

    it('should return error message if the object is missing values for the pixelArray or pixelColor  properties', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          bmp.pixelArray = null;
          bmp.colorArray = null;
          transform.reverse(bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(err).toBe('This is not a valid bitmap object');
            done();
          });
        });
      });
    });

    it('should modify the pixelArray of the bitmap image.', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          let orgPixelArray = Buffer.from(bmp.pixelArray);
          transform.reverse(bmp, (err, bmp) => {
            if(err) console.error(err);
            let modPixelArray = Buffer.from(bmp.pixelArray);
            expect(Buffer.compare(orgPixelArray, modPixelArray)).not.toBe(0);
            done();
          });
        });
      });
    });
  });

  it('should should reverse the pixelArray of the bitmap image.', (done) => {
    reader.read(imagePath, (err, data) => {
      bitmap.parse(data, (err, bmp) => {
        let orgPixelArray = Buffer.from(bmp.pixelArray);
        transform.reverse(bmp, (err, bmp) => {
          if(err) console.error(err);
          let modPixelArray = Buffer.from(bmp.pixelArray);
          expect(Buffer.compare(orgPixelArray.reverse(), modPixelArray)).toBe(0);
          done();
        });
      });
    });
  });
  
  describe('#Transform.boostGreen tests', function() {
    it('should return error message if the object was not created by the Bmp constructor', (done) => {
      transform.boostGreen({some: 'thing'}, (err, bmp) => {
        if(err) console.error(err);
        expect(err).toBe('This is not a valid bitmap object');
        done();
      });
    });

    it('should return error message if the object is missing the pixelArray or pixelColor  properties', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          delete bmp.pixelArray;
          delete bmp.colorArray;
          transform.boostGreen(bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(err).toBe('This is not a valid bitmap object');
            done();
          });
        });
      });
    });

    it('should return error message if the object is missing values for the pixelArray or pixelColor  properties', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          bmp.pixelArray = null;
          bmp.colorArray = null;
          transform.boostGreen(bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(err).toBe('This is not a valid bitmap object');
            done();
          });
        });
      });
    });

    it('should boost all green values to 255', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          transform.boostGreen(bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(bmp.colorArray.every((green, i) => (!((i + 3) % 4)) ? green === 255 : true)).toBe(true);
            done();
          });
        });
      });
    });

  });

  describe('#Transform.boostRed  tests', function() {
    it('should return error message if the objet was not created by the Bmp constructor', (done) => {
      transform.boostRed ({some: 'thing'}, (err, bmp) => {
        if(err) console.error(err);
        expect(err).toBe('This is not a valid bitmap object');
        done();
      });
    });

    it('should return error message if the object is missing the pixelArray or pixelColor  properties', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          delete bmp.pixelArray;
          delete bmp.colorArray;
          transform.boostRed (bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(err).toBe('This is not a valid bitmap object');
            done();
          });
        });
      });
    });

    it('should return error message if the object is missing values for the pixelArray or pixelColor  properties', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          bmp.pixelArray = null;
          bmp.colorArray = null;
          transform.boostRed (bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(err).toBe('This is not a valid bitmap object');
            done();
          });
        });
      });
    });

    it('should boost all red values to 255', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          transform.boostRed(bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(bmp.colorArray.every((red, i) => (!((i + 2) % 4)) ? red === 255 : true)).toBe(true);
            done();
          });
        });
      });
    });
  });

  describe('#Transform.boostBlue tests', function() {
    it('should return error message if the objet was not created by the Bmp constructor', (done) => {
      transform.boostBlue({some: 'thing'}, (err, bmp) => {
        if(err) console.error(err);
        expect(err).toBe('This is not a valid bitmap object');
        done();
      });
    });

    it('should return error message if the object is missing the pixelArray or pixelColor  properties', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          delete bmp.pixelArray;
          delete bmp.colorArray;
          transform.boostBlue(bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(err).toBe('This is not a valid bitmap object');
            done();
          });
        });
      });
    });

    it('should return error message if the object is missing values for the pixelArray or pixelColor  properties', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          bmp.pixelArray = null;
          bmp.colorArray = null;
          transform.boostBlue(bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(err).toBe('This is not a valid bitmap object');
            done();
          });
        });
      });
    });

    it('should boost all blue values to 255', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          transform.boostBlue(bmp, (err, bmp) => {
            if(err) console.error(err);
            bmp.colorArray.every((green, i) => (!i % 4) ? green === 255 : true);
            expect(bmp.colorArray.every((blue, i) => (!((i + 4) % 4)) ? blue === 255 : true)).toBe(true);
            done();
          });
        });
      });
    });

  });

  describe('#Transform.redChannel  tests', function() {
    it('should return error message if the objet was not created by the Bmp constructor', (done) => {
      transform.redChannel({some: 'thing'}, (err, bmp) => {
        if(err) console.error(err);
        expect(err).toBe('This is not a valid bitmap object');
        done();
      });
    });

    it('should adjust blue and green to equal red', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          transform.redChannel(bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(bmp.colorArray.every((bit, i, arr) => (!((i + 1) % 4)) ? (arr[i - 1] + arr[i - 2]) / 2 === bmp.colorArray[i - 3] : true)).toBe(true);

            done();
          });
        });
      });
    });

    it('should return error message if the object is missing the pixelArray or pixelColor  properties', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          delete bmp.pixelArray;
          delete bmp.colorArray;
          transform.redChannel (bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(err).toBe('This is not a valid bitmap object');
            done();
          });
        });
      });
    });

    it('should return error message if the object is missing values for the pixelArray or pixelColor  properties', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          bmp.pixelArray = null;
          bmp.colorArray = null;
          transform.redChannel (bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(err).toBe('This is not a valid bitmap object');
            done();
          });
        });
      });
    });

  });

  describe('#Transform.blackWhite  tests', function() {
    it('should return error message if the objet was not created by the Bmp constructor', (done) => {
      transform.blackWhite({some: 'thing'}, (err, bmp) => {
        if(err) console.error(err);
        expect(err).toBe('This is not a valid bitmap object');
        done();
      });
    });

    it('should return error message if the object is missing the pixelArray or pixelColor  properties', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          delete bmp.pixelArray;
          delete bmp.colorArray;
          transform.blackWhite(bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(err).toBe('This is not a valid bitmap object');
            done();
          });
        });
      });
    });

    it('should return error message if the object is missing values for the pixelArray or pixelColor  properties', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          bmp.pixelArray = null;
          bmp.colorArray = null;
          transform.blackWhite(bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(err).toBe('This is not a valid bitmap object');
            done();
          });
        });
      });
    });

    it('should adjust blue, green, red to all be equal.', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          transform.blackWhite(bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(bmp.colorArray.every((bit, i, arr) => (!((i + 1) % 4)) ? (arr[i - 1] + arr[i - 2] + arr[i - 3]) / 3 === arr[i - 1] : true)).toBe(true);
            done();
          });
        });
      });
    });

  });

  describe('#Transform.invert2 tests', function() {
    it('should return error message if the objet was not created by the Bmp constructor', (done) => {
      transform.invert2({some: 'thing'}, (err, bmp) => {
        if(err) console.error(err);
        expect(err).toBe('This is not a valid bitmap object');
        done();
      });
    });

    it('should return error message if the object is missing the pixelArray or pixelColor  properties', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          delete bmp.pixelArray;
          delete bmp.colorArray;
          transform.invert2(bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(err).toBe('This is not a valid bitmap object');
            done();
          });
        });
      });
    });

    it('should return error message if the object is missing values for the pixelArray or pixelColor  properties', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          bmp.pixelArray = null;
          bmp.colorArray = null;
          transform.invert2(bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(err).toBe('This is not a valid bitmap object');
            done();
          });
        });
      });
    });

    it('should adjust every fourth bit to 255.', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          let orgColorArray = Buffer.from(bmp.colorArray);
          transform.invert2(bmp, (err, bmp) => {
            if(err) console.error(err);
            let modColorArray = Buffer.from(bmp.colorArray);
            expect(modColorArray.every((bit, i, arr) => (!((i + 1 ) % 4)) ? arr[i -3] + orgColorArray[i -3] === 255 : true)).toBe(true);
            done();
          });
        });
      });
    });

  });

  describe('#Transform.invert3 tests', function() {
    it('should return error message if the objet was not created by the Bmp constructor', (done) => {
      transform.invert3({some: 'thing'}, (err, bmp) => {
        if(err) console.error(err);
        expect(err).toBe('This is not a valid bitmap object');
        done();
      });
    });

    it('should return error message if the object is missing the pixelArray or pixelColor  properties', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          delete bmp.pixelArray;
          delete bmp.colorArray;
          transform.invert3(bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(err).toBe('This is not a valid bitmap object');
            done();
          });
        });
      });
    });

    it('should return error message if the object is missing values for the pixelArray or pixelColor  properties', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          bmp.pixelArray = null;
          bmp.colorArray = null;
          transform.invert3(bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(err).toBe('This is not a valid bitmap object');
            done();
          });
        });
      });
    });

    it('should adjust every 3 bit to 255.', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          let orgColorArray = Buffer.from(bmp.colorArray);
          transform.invert3(bmp, (err, bmp) => {
            if(err) console.error(err);
            let modColorArray = Buffer.from(bmp.colorArray);
            expect(modColorArray.every((bit, i, arr) => (!((i + 3 ) % 3)) ? arr[i] + orgColorArray[i] === 255 : true)).toBe(true);
            done();
          });
        });
      });
    });

  });

  describe('#Transform.invert4 tests', function() {
    it('should return error message if the objet was not created by the Bmp constructor', (done) => {
      transform.invert4({some: 'thing'}, (err, bmp) => {
        if(err) console.error(err);
        expect(err).toBe('This is not a valid bitmap object');
        done();
      });
    });

    it('should return error message if the object is missing the pixelArray or pixelColor  properties', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          delete bmp.pixelArray;
          delete bmp.colorArray;
          transform.invert4(bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(err).toBe('This is not a valid bitmap object');
            done();
          });
        });
      });
    });

    it('should return error message if the object is missing values for the pixelArray or pixelColor  properties', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          bmp.pixelArray = null;
          bmp.colorArray = null;
          transform.invert4(bmp, (err, bmp) => {
            if(err) console.error(err);
            expect(err).toBe('This is not a valid bitmap object');
            done();
          });
        });
      });
    });
    it('should adjust every 2 bit to 255.', (done) => {
      reader.read(imagePath, (err, data) => {
        bitmap.parse(data, (err, bmp) => {
          let orgColorArray = Buffer.from(bmp.colorArray);
          transform.invert4(bmp, (err, bmp) => {
            if(err) console.error(err);
            let modColorArray = Buffer.from(bmp.colorArray);
            expect(modColorArray.every((bit, i) => (!((i + 1)) % 2) ? bit + orgColorArray[i] === 255 : true)).toBe(true);
            done();
          });
        });
      });
    });

  });

});