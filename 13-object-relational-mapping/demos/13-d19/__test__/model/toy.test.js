'use strict'

const Toy = require('../../model/toy')
require('jest')

describe('Testing Toy Schema', function () {
  describe('default properties', () => {
    beforeAll(() => {
      this.toy = new Toy({name: 'barney', desc: 'purple dino'})
    })

    test('should have a name', () => {
      expect(this.toy.name).toBe('barney')
    })
    test('should have a desc', () => {
      expect(this.toy.desc).toBe('purple dino')
    })
  })
})