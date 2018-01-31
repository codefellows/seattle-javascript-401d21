'use strict';

let Note = require('../../model/note');
require('jest');

let testNote;
new Note('note', 'test')
  .then(note => testNote = note);

describe('Note Constructor Unit Tests', () => {
  describe('Valid input testing', () => {
    it('Should return a valid note object when provided valid inputs', () => {
      expect(testNote).toBeInstanceOf(Note);
    });
    it('Should return an object with the correct properties', () => {
      expect(testNote).toHaveProperty('title');
      expect(testNote).toHaveProperty('content');
      expect(testNote).toHaveProperty('_id');
    });
    it('The object returned should have the correct information passed in as the values of the properties', () => {
      expect(testNote.title).toBe('note');
      expect(testNote.content).toBe('test');
    });
  });
  describe('Invalid input testing', () => {
    it('should throw an error if not provided with valid input', () => {
      new Note()
        .catch(err => expect(err).toBeInstanceOf(Error));
    });
  });
});