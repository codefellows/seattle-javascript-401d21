'use strict';

require('./lib/setup');

const superagent = require('superagent');
const server = require('../lib/server');
const categoryMock = require('./lib/category-mock');

const apiURL = `http://localhost:${process.env.PORT}/api/categories`;

describe('/api/categories', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(categoryMock.remove);

  describe('POST /categories', () => {
    test('should return a 200 and a category if there are no errors', () => {
      return superagent.post(apiURL)
        .send({
          title : 'cats',
          keywords : ['animals', 'cute'],
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.keywords).toEqual(['animals','cute']);
        });
    });

    test('should return a 409 due to a duplicate title', () => {
      return categoryMock.create()
        .then(category => {
          return superagent.post(apiURL)
            .send({
              title : category.title,
              keywords : [],
            });
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(409);
        });
    });
  });

  describe('GET /categories/:id', () => {
    test('Should respond with a 200 status and a category if there are no error', () => {
      let tempCategoryMock;

      return categoryMock.create()
        .then(category => {
          tempCategoryMock = category;
          return superagent.get(`${apiURL}/${category.id}`);
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(JSON.stringify(response.body.keywords))
            .toEqual(JSON.stringify(tempCategoryMock.keywords));
        });
    });
  });
});