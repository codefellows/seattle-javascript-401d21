'use strict';

require('./lib/setup');

const superagent = require('superagent');
const server = require('../lib/server');
const accountMock = require('./lib/account-mock');
const songMock = require('./lib/song-mock');

const __API_URL__ = `http://localhost:${process.env.PORT}`;

describe('Song router', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(songMock.remove);

  describe('POST /songs', () => {
    test.only('POST /songs should return a 200 status and a song if there are no errors', () => {
      let tempAccountMock = null;
      return accountMock.create()
        .then(accountMock => {
          tempAccountMock = accountMock;

          return superagent.post(`${__API_URL__}/songs`)
            .set('Authorization', `Bearer ${tempAccountMock.token}`)
            .field('title', 'nyancat')
            .attach('song', `${__dirname}/asset/nyancat.mp3`)
            .then(response => {
              expect(response.status).toEqual(200);
              expect(response.body.title).toEqual('nyancat');
              expect(response.body._id).toBeTruthy();
              expect(response.body.url).toBeTruthy();
            });
        });
    });

    test('POST /songs should return a 400 status and a song if there are no errors', () => {
      let tempAccountMock = null;
      return accountMock.create()
        .then(accountMock => {
          tempAccountMock = accountMock;

          return superagent.post(`${__API_URL__}/songs`)
            .set('Authorization', `Bearer ${tempAccountMock.token}`)
            .field('thing', 'nyancat')
            .attach('song', `${__dirname}/asset/nyancat.mp3`)
            .then(Promise.reject)
            .catch(response => {
              expect(response.status).toEqual(400);
            });
        });
    });

    test('POST /songs should return a 401 status and a song if there are no errors', () => {
      return accountMock.create()
        .then(() => superagent.post(`${__API_URL__}/songs`)
          .set('Authorization', 'Bearer ofBadTokens')
          .field('field', 'nyancat')
          .attach('song', `${__dirname}/asset/nyancat.mp3`)
          .then(Promise.reject)
          .catch(response => {
            expect(response.status).toEqual(401);
          }));
    });
  });

  describe('GET /songs/:id', () => {
    test('GET /songs/:id should return a 200 status and a song if there are no errors', () => {
      let tempSongMock = null;
      return songMock.create()
        .then(songMock => {
          tempSongMock = songMock;

          return superagent.get(`${__API_URL__}/songs/${tempSongMock.song._id}`)
            .set('Authorization', `Bearer ${tempSongMock.accountMock.token}`)
            .then(response => {
              expect(response.status).toEqual(200);
              expect(response.body.title).toEqual(tempSongMock.song.title);
              expect(response.body._id).toEqual(tempSongMock.song._id.toString());
              expect(response.body.url).toEqual(tempSongMock.song.url);
            });
        });
    });

    test('GET /songs/:id should return a 404 status if the id is not found', () => {
      let tempSongMock = null;
      return songMock.create()
        .then(songMock => {
          tempSongMock = songMock;

          return superagent.get(`${__API_URL__}/songs/fakesongid`)
            .set('Authorization', `Bearer ${tempSongMock.accountMock.token}`)
            .then(Promise.reject)
            .catch(response => {
              expect(response.status).toEqual(404);
            });
        });
    });

    test('GET /songs/:id should return a 401 status if the token is bad', () => {
      let tempSongMock = null;
      return songMock.create()
        .then(songMock => {
          tempSongMock = songMock;

          return superagent.get(`${__API_URL__}/songs/${tempSongMock.song._id}`)
            .set('Authorization', 'Bearer ofBadTokens')
            .then(Promise.reject)
            .catch(response => {
              expect(response.status).toEqual(401);
            });
        });
    });
  });

  describe('DELETE /songs/:id', () => {
    test('DELETE /songs/:id should return a 204 status if there are no errors', () => {
      let tempSongMock = null;
      return songMock.create()
        .then(songMock => {
          tempSongMock = songMock;
          return superagent.delete(`${__API_URL__}/songs/${tempSongMock.song._id}`)
            .set('Authorization', `Bearer ${tempSongMock.accountMock.token}`)
            .then(response => {
              expect(response.status).toEqual(204);
            });
        });
    });

    test('DELETE /songs/:id should return a 404 status if the id is bad', () => {
      let tempSongMock = null;
      return songMock.create()
        .then(songMock => {
          tempSongMock = songMock;
          return superagent.delete(`${__API_URL__}/songs/badId`)
            .set('Authorization', `Bearer ${tempSongMock.accountMock.token}`)
            .then(Promise.reject)
            .catch(response => {
              expect(response.status).toEqual(404);
            });
        });
    });

    test('DELETE /songs/:id should return a 401 status if the token is invalid', () => {
      let tempSongMock = null;
      return songMock.create()
        .then(songMock => {
          tempSongMock = songMock;
          return superagent.delete(`${__API_URL__}/songs/${tempSongMock.song._id}`)
            .set('Authorization', 'Bearer ofBadTokens')
            .then(Promise.reject)
            .catch(response => {
              expect(response.status).toEqual(401);
            });
        });
    });
  });
});