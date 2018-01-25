'use strict'

const server = require('../lib/server')
const superagent = require('superagent')
require('jest')

describe('Server Integration Testing', function() {
  beforeAll(() => server.start(4000, () => console.log(`Listening on 4000`)))
  afterAll(() => server.stop())

  describe('Valid requests', () => {
    describe('POST /api/v1/note', () => {
      let resPost

      beforeAll(() => {
        return superagent.post(':4000/api/v1/note')
        .send({title: 'hello', content: 'watman'})
        .then(res => {
          // console.log(res)
          resPost = res
        })
        // .catch(console.error)
      })

      it('should post and create a new record', () => {
        expect(resPost.body.title).toEqual('hello')
        expect(resPost.body.content).toEqual('watman')
      })
      it('should respond with a status code 201', () => {
        expect(resPost.status).toBe(201)
      })
      it('should have an _id property on the response object', () => {
        expect(resPost.body).toHaveProperty('_id')
      })
    })

    describe('GET /api/v1/note', () => {
      let postOne, postTwo, getOne

      beforeAll(() => {
        return superagent.post(':4000/api/v1/note')
          .send({ title: 'hello', content: 'watman' })
          .then(res => {
            // console.log(res)
            postOne = res

            return superagent.post(':4000/api/v1/note')
              .send({ title: 'bye', content: 'watwoman' })
              .then(res => {
                postTwo = res
              })
          })
        })

        beforeAll(() => {
          return superagent.get(':4000/api/v1/note')
          .then(res => getOne = res)
        })

        it('should return an array of ids', () => {
          getOne.body.map(id => {
            expect(id).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)
          })
        })
        it('should return a status code of 200', () => {
          expect(getOne.status).toBe(200)
        })
        it('should contain the two ids of records posted', () => {
          expect(getOne.body).toContain(postOne.body._id)
          expect(getOne.body).toContain(postTwo.body._id)
        })
    })

    describe('GET /api/v1/note?_id=<record id>', () => {

    })
  })

  describe('Invalid requests', () => {
    describe('POST /api/v1/note', () => {

      it('should return a 404 given an incorrect path', () => {
        return superagent.post(':4000/api/v1/doesnotexist')
        .send({title: '', content: ''})
        .catch(err => {
          expect(err.status).toBe(404)
        })
      })

      it('should return a 400 given no body of data on the request', () => {
        return superagent.post(':4000/api/v1/note')
        .send()
        .catch(err => {
          expect(err.status).toBe(400)
        })
      })

      it('')
    })
  })
})