'use stirct'

import * as db from '../lib/db.js'
import {compare} from 'bcrypt'
import User from '../model/user.js'
import {mockUser} from './lib/mock-user.js'

describe('USER', () => {
  beforeAll(() => db.start())
  afterAll(db.stop)
  afterEach(() => User.remove({}))

  describe('mockUser', () => {
    test('should resolve a password, user, and token', () => {
      return mockUser()
      .then(({password, user, token}) => {
        expect(token).toBeTruthy()
        expect(password).toBeTruthy()
        expect(user).toBeTruthy()
      })
    })
  })

  describe('%create', () => {
    test('should not reject with valid data', () => {
      let data = {
        username: 'testuser', 
        password: 'abcd1234',
        email: 'testuser@example.com'
      }

      return User.create(data)
      .then(user => {
        expect(user._id).toBeTruthy()
        expect(user.passwordHash).toBeTruthy()
        expect(user.username).toEqual(data.username)
        expect(user.email).toEqual(data.email)
        expect(user.randomHash).toBe('')
        return compare(data.password, user.passwordHash)
      })
      .then(success => {
        expect(success).toBeTruthy()
      })
    })

    test('should reject with no invalid data', () => {
      let data = {
        username: 'testuser', 
        password: 'abcd1234',
        email: 'testuser@example.com'
      }

      return Promise.all([
        User.create({...data, username: undefined}).catch(err => err),
        User.create({...data, email: undefined}).catch(err => err),
        User.create({...data, password: undefined}).catch(err => err),
      ])
      .then(errors => {
        errors.forEach(err => {
          expect(err).toBeInstanceOf(Error)
          expect(err.status).toBe(400)
        })
      })
    })
  })

  describe('#tokenCreate', () => {
    test('should create a new token', () => {
      let tokenCache
      return mockUser()
      .then(({token, user}) => {
        tokenCache = token
        return user.tokenCreate()
      })
      .then((token) => {
        expect(token).toBeTruthy()
        expect(token).not.toEqual(tokenCache)
      })
    })
  })

  describe('#passwordCompare', () => {
    test('to resolve the user', () => {
      let userCache
      return mockUser()
      .then(({password, user}) => {
        userCache = user
        return user.passwordCompare(password)
      })
      .then((user) => {
        expect(user).toEqual(userCache)
      })
    })
  })
})
