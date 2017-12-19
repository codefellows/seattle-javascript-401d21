'use strict';

require('./lib/setup');

const superagent = require('superagent');
const resumeMock = require('./lib/resume-mock');
const server = require('../lib/server');

const apiURL = `http://localhost:${process.env.PORT}/api/resumes`;

describe('/api/resumes', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(resumeMock.remove);

  describe('POST /api/resumes', () => {
    test('should respond with a resume and a 200 status code if there is no error', () => {
      return superagent.post(apiURL)
        .send({
          name : 'zaphod',
          age : '30',
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual('zaphod');
        });
    });

    test('should respond with a 400 code if we send an incomplete resume', () => {
      let resumeToPost = {
        age : 4545,
      };
      return superagent.post(`${apiURL}`)
        // .send({
        //   name : 'zaphod',
        // })
        .send(resumeToPost)
        .then(Promise.reject)
        .catch(response => {
          console.log(response);
          expect(response.status).toEqual(400);
        });
    });

    test('should respond with a 409 code if we send a resume with a project property, which is a unique property, that already exists', () => {
      return resumeMock.create()
        .then(resume => {
          return superagent.post(apiURL)
            .send({
              project : resume.project,
              name : resume.name,
              age : resume.age,
              _id : resume._id,
            });
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(409);
        });
    });
  });
    

  describe('DELETE /api/resumes/:id', () => {
    test('should respond with a 204 if there are no errors', () => {
      return resumeMock.create()
        .then(resume => {
          return superagent.delete(`${apiURL}/${resume._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(204);
        });
    });

    test('should respond with a 404 if the id is invalid', () => {
      return superagent.delete(`${apiURL}/superFakeID`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('PUT /api/resumes', () => {
    test('PUT should update resume and respond with a 200 if there are no errors', () => {

      let resumeToUpdate = null;

      return resumeMock.create()
        .then(resume => {
          resumeToUpdate = resume;
          console.log(resume);
          return superagent.put(`${apiURL}/${resume._id}`)
            .send({name : 'Zaphod'});
        })
        .then(response => {
          expect(response.status).toEqual(200);
          //expect(response.body.project).toEqual('Zaphod');
          expect(response.body.name).toEqual('Zaphod');          
          expect(response.body._id).toEqual(resumeToUpdate._id.toString());
        });
    });

    // bonus points : 
    // test('PUT should respond with a 409 code if we send a resume with a project property, which is a unique property, that already exists', () => {
    //   return resumeMockupCreator()
    //     .then(resume => {
    //       return superagent.put(apiURL)
    //         .send({
    //           project : resume.project,
    //           name : resume.name,
    //           age : resume.age,
    //         });
    //     })
    //     .then(Promise.reject)
    //     .catch(response => {
    //       expect(response.status).toEqual(409);
    //     });
    // });

  });

  describe('GET /api/resumes', () => {
    test('GET should respond with a 200 status code if there is no error', () => {
      let resumeToTest = null;

      return resumeMock.create()
        .then(resume => {
          resumeToTest = resume;
          return superagent.get(`${apiURL}/${resume._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(200);

          expect(JSON.stringify(response.body.name))
            .toEqual(JSON.stringify(resumeToTest.name));
        });
    });
    test('should respond with a 404 status code if the id is incorrect', () => {
      return superagent.get(`${apiURL}/superFakeId`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });
});