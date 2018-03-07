import request from 'superagent'
import cleanDB from './lib/clean-db.js'
import * as server from '../lib/server.js'
import {mockUser} from './lib/mock-user.js'
import * as _ from 'ramda'
import {each, partialRight} from '../lib/util.js'

const API_URL = process.env.API_URL

describe('routerAuth', () => {
  beforeAll(server.start)
  afterAll(server.stop)
  afterEach(cleanDB)

  describe('POST /signup', () => {
    let signupRequest = (data) => 
      request.post(`${API_URL}/signup`)
      .set('Content-Type', 'application/json')
      .send(data)

    let signupData = {
      username: 'sharky', 
      password: 'redpill', 
      email: 'sharky@example.com',
    }

    test('should respond with a token', () => {
      return signupRequest(signupData)
      .then(res => {
        expect(res.status).toEqual(200)
        expect(res.text).toBeTruthy()
      })
    })

    test('should respond with 400 bad request', () => {
      return Promise.all([
        signupRequest({}).catch(res => res),
        signupRequest({...signupData, email: undefined}).catch(res => res),
        signupRequest({...signupData, username: undefined}).catch(res => res),
        signupRequest({...signupData, password: undefined}).catch(res => res),
      ])
      .then(partialRight(each, (res) => {
          expect(res.status).toEqual(400)
      }))
    })
  })

  describe('GET /login', () => {
    let loginRequest = (data) => 
      request.get(`${API_URL}/login`)
      .auth(data.user.username, data.password)

    test('should respond with a token', () => {
      return mockUser()
      .then(userData => loginRequest(userData))
      .then(res => {
        expect(res.status).toEqual(200)
        expect(res.text).toBeTruthy()
        let XSlugramToken = res.headers['set-cookie'][0]
        expect(XSlugramToken.indexOf(`X-Sluggram-Token=${res.text}`)).toBeGreaterThan(-1)
      })
    })

    test('should respond with 400', () => {
      return Promise.all([
        request.get(`${API_URL}/login`).catch(res => res),
        request.get(`${API_URL}/login`)
          .set('Authorizaton', 'not valid').catch(res => res),
      ])
      .then(_.forEach( res => {
        expect(res.status).toEqual(400)
      }))
    })

    test('should respond with 401', () => {
      return mockUser()
      .then(user => Promise.all([
        loginRequest({...user, password: 'bad-password'}).catch(res => res),
        loginRequest({...user, user: {username: 'bad-username'}}).catch(res => res),
      ]))
      .then(_.forEach(res => {
        expect(res.status).toEqual(401)
      }))
    })
  })
})
