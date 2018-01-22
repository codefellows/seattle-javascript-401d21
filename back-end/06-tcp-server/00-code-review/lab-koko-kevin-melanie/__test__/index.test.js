'use strict';

const index = require('../index.js');
require('jest');

describe('Index Module', function() {
  describe('#Start', () => {
    it('should not run without arguments', () => {
      expect(index.processImage([])).toEqual(expect.stringContaining('Invalid arguments'));
    });
    it('should not run with less than three arguments', () => {
      expect(index.processImage(['./__test__/asset/bitmap.bmp', 'test'])).toEqual(expect.stringContaining('Invalid arguments'));
    });
    it('should not run with invalid transform method', () => {
      expect(index.processImage(['node', 'index.js', './__test__/asset/bitmap.bmp', 'test', 'foo'])).toEqual(expect.stringContaining('Invalid transform method'));
    });
  });
});
