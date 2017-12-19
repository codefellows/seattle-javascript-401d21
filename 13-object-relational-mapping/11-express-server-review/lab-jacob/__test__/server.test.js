'use strict';

process.env.PORT =  7000;
process.env.MONGODB_URI = 'mongodb://localhost/testing';

const faker = require('faker');
const superagent = require('superagent');
const starTrekEpisodes = require('../model/star-trek-episodes');
const server = require('../lib/server');

const apiURL = `http://localhost:${process.env.PORT}/api/star-trek-episodes`;
let sequentialId = 0;

const starTrekMockEpisode = () => {
  sequentialId++;
  return new starTrekEpisodes({
    // title : `Encounter at Farpoint`,// vinicio - bad practice
    title : faker.lorem.words(10),// vinicio - bad practice
    //episode : 1,// vinicio - bad practice in mock code
    episode : sequentialId,// vinicio - bad practice in mock code
    content : faker.lorem.words(50),
  }).save();
};

const episodeMockCreateMany = (amountofEpisodes) => {
  return Promise.all(new Array(amountofEpisodes)
    .fill(0)
    .map(() => starTrekMockEpisode()));
};

describe('/api/star-trek-episodes', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(() => starTrekEpisodes.remove({}));

  describe('POST /api/star-trek-episodes', () => {
    test('Should respond with a Episode and 200 status code if there is no error', () => {
      let episodeToPost = {
        title : `Encounter at Farpoint`,
        episode : 1,
        content : faker.lorem.words(50),
      };
      return superagent.post(`${apiURL}`)
        .send(episodeToPost)
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body._id).toBeTruthy();
          expect(response.body.timestamp).toBeTruthy();

          expect(response.body.title).toEqual(episodeToPost.title);
          expect(response.body.episode).toEqual(episodeToPost.episode);
          expect(response.body.content).toEqual(episodeToPost.content);
        });
    });
 
    test('should respond with a 400 code if we send an incomplete Episode', () => {
      
      let episodeToPost = {
        content : faker.lorem.words(100),
      };
      return superagent.post(`${apiURL}`)
        .send(episodeToPost)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

  });

  describe('PUT /api/episodes', () => {
    test('should update note and respond with 200 if there are no errors', () => {

      let episodeToUpdate= null;

      return starTrekMockEpisode()
        .then(episode => {
          episodeToUpdate = episode;
          return superagent.put(`${apiURL}/${episode._id}`)
            .send({title : 'Gregor and The Hound'});
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.title).toEqual('Gregor and The Hound');
          expect(response.body.content).toEqual(episodeToUpdate.content);
          expect(response.body._id).toEqual(episodeToUpdate._id.toString());
        });
    });
  });

  describe('GET /api/star-trek-episodes', () => {
    test('Should respond with 200 status code if there is no error', () => {
      let episodeToTest = null;

      return starTrekMockEpisode()
        .then(Episode => {
          episodeToTest = Episode;
          return superagent.get(`${apiURL}/${Episode._id}`);
        })
        .then(response => {
          console.log(response.body);
          expect(response.status).toEqual(200);

          expect(response.body._id).toEqual(episodeToTest._id.toString());
          expect(response.body.timestamp).toBeTruthy();

          expect(response.body.title).toEqual(episodeToTest.title);
          expect(response.body.content).toEqual(episodeToTest.content);
        });
    });
  
    test('should respond with 404 status code if the ID is incorrect', () => {
      return superagent.get(`${apiURL}/WRONG_ID`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('GET /api/star-trek-episodes', () => {
    test('Should respond with 200 status code if there is no error', () => {

      return starTrekMockEpisode()
        .then( () => {
          return superagent.get(`${apiURL}`);
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.count).toBeTruthy();
          expect(Array.isArray(response.body.data)).toBeTruthy();
        });
    });
  });

  //FIND GET
  describe('GET /api/star-trek-episodes', () => {
    test('should return ', () => {// vinicio - bad test message
      return episodeMockCreateMany(100)
        .then(manyEpisodes => {
          return superagent.get(`${apiURL}`);
        })
        .then(response => {
          //console.log(response.body);
          expect(response.status).toEqual(200);
          expect(response.body.count).toEqual(100);
        });
    });
  });

  describe('DELETE /api/star-trek-episodes', () =>{
    
    test('should response with 204 code if there is no error', () => {   
      return starTrekMockEpisode()
        .then(Episode => {
          return superagent.delete(`${apiURL}/${Episode._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(204);
        });
    });
  });
});