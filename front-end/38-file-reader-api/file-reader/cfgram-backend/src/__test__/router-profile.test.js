import * as _ from 'ramda'
import request from 'superagent'
import cleanDB from './lib/clean-db.js'
import * as server from '../lib/server.js'
import {mockUser} from './lib/mock-user.js'
import {mockProfile, mockManyProfiles} from './lib/mock-profile.js'

const API_URL = process.env.API_URL

describe('router-profile', () => {
  beforeAll(server.start)
  afterAll(server.stop)
  afterEach(cleanDB)

  describe('POST /profiles', () => {
    let postJSONProfie = (data) => 
      mockUser()
      .then(userData => {
        return request.post(`${API_URL}/profiles`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${userData.token}`)
        .send(data)
        .then(res => ({res, userData}))
      })

    let postMultipartProfie = (data) => 
      mockUser()
      .then(userData => {
        return request.post(`${API_URL}/profiles`)
        .set('Content-Type', 'multipart/form-data')
        .set('Authorization', `Bearer ${userData.token}`)
        .attach('avatar', `${__dirname}/asset/test-asset.png`)
        .field('bio', data.bio)
        .then(res => ({res, userData}))
      })
    
    test('json post should respond with a profile', () => {
      return postJSONProfie({bio: 'cool beans'})
      .then(({res, userData}) => {
        expect(res.status).toEqual(200)
      })
    })

    test('multiparty post should respond with a profile', () => {
      return postMultipartProfie({bio: 'cool beans'})
      .then(({res, userData}) => {
        expect(res.status).toEqual(200)
        expect(res.body.bio).toEqual('cool beans')
        expect(res.body.owner).toEqual(userData.user._id.toString())
        expect(res.body.email).toEqual(userData.user.email)
        expect(res.body.username).toEqual(userData.user.username)
      })
    })
  })

  describe('GET /profiles', () => {
    let getProfileIdMap = _.reduce((result, next) => 
      ({...result, [next.profile._id]: JSON.parse(JSON.stringify(next))}) , {})

    let compareMockWithResponse = (data) => {
      let dataById = getProfileIdMap(data)
      return _.forEach(profile => {
        let mockedData = dataById[profile._id]
        expect(profile.owner).toEqual(mockedData.profile.owner)
        expect(profile.username).toEqual(mockedData.profile.username)
        expect(profile.email).toEqual(mockedData.profile.email)
        expect(profile.bio).toEqual(mockedData.profile.bio)
        expect(profile.avatar).toEqual(mockedData.profile.avatar)
      })
    }

    test('should return 100 profiles', () => {
       return mockManyProfiles(175)
      .then((profileData) => {
        return request.get(`${API_URL}/profiles`)
        .then(res => {
          expect(res.status).toEqual(200)
          expect(res.body.count).toEqual(175)
          expect(res.body.data.length).toEqual(100)
          expect(res.body.prev).toEqual(null)
          expect(res.body.next).toEqual(`${API_URL}/profiles?page=2`)
          expect(res.body.last).toEqual(`${API_URL}/profiles?page=2`)
          compareMockWithResponse(profileData)(res.body.data)
        })
      })
    })

    test('?page=2 should return 50 profiles', () => {
     return mockManyProfiles(150)
      .then((profileData) => {
        return request.get(`${API_URL}/profiles?page=2`)
        .then(res => {
          expect(res.status).toEqual(200)
          expect(res.body.count).toEqual(150)
          expect(res.body.data.length).toEqual(50)
          expect(res.body.next).toEqual(null)
          expect(res.body.prev).toEqual(`${API_URL}/profiles?page=1`)
          expect(res.body.last).toEqual(`${API_URL}/profiles?page=2`)
          compareMockWithResponse(profileData)(res.body.data)
        })
      })
    })

    test('?page=-1 should return 10 profiles', () => {
     return mockManyProfiles(10)
      .then((profileData) => {
        return request.get(`${API_URL}/profiles?page=-1`)
        .then(res => {
          expect(res.status).toEqual(200)
          expect(res.body.count).toEqual(10)
          expect(res.body.prev).toEqual(null)
          expect(res.body.next).toEqual(null)
          expect(res.body.last).toEqual(`${API_URL}/profiles?page=1`)
          compareMockWithResponse(profileData)(res.body.data)
        })
      })
    })

    test('?page=2 should return 100 profiles', () => {
     return mockManyProfiles(300)
      .then((profileData) => {
        return request.get(`${API_URL}/profiles?page=2`)
        .then(res => {
          expect(res.status).toEqual(200)
          expect(res.body.count).toEqual(300)
          expect(res.body.prev).toEqual(`${API_URL}/profiles?page=1`)
          expect(res.body.next).toEqual(`${API_URL}/profiles?page=3`)
          expect(res.body.last).toEqual(`${API_URL}/profiles?page=3`)
          expect(res.body.data.length).toEqual(100)
          compareMockWithResponse(profileData)(res.body.data)
        })
      })
    })

    test('?page=3 should return 0 profiles', () => {
     return mockManyProfiles(10)
      .then(({userData, profiles}) => {
        return request.get(`${API_URL}/profiles?page=3`)
        .then(res => {
          expect(res.status).toEqual(200)
          expect(res.body.count).toEqual(10)
          expect(res.body.prev).toEqual(null)
          expect(res.body.next).toEqual(null)
          expect(res.body.last).toEqual(`${API_URL}/profiles?page=1`)
          expect(res.body.data.length).toEqual(0)
        })
      })
    })
  })

  describe('GET /profiles/:id', () => {
    test('should return a profile', () => {
      return mockProfile()
      .then(({userData, profile}) => {
        return request.get(`${API_URL}/profiles/${profile._id}`)
        .then(res => {
          expect(res.status).toEqual(200)
          profile = JSON.parse(JSON.stringify(profile))
          expect(res.body).toEqual(profile)
        })
      })
    })

    test('should return a 404', () => {
      return request.get(`${API_URL}/profiles/597e89cbcc524228f3c8092e`)
      .catch(res => {
        expect(res.status).toEqual(404)
      })
    })
  })

  describe('GET /profiles/me', () => {
    test('should return user profile', () => {
      return mockProfile()
      .then(mock => {
        return request(`${API_URL}/profiles/me`)
        .set('Authorization', `Bearer ${mock.userData.token}`)
        .then(res => {
          expect(res.status).toEqual(200)
          expect(res.body.owner).toEqual(mock.userData.user._id.toString())
        })
      })
    })
  })

  describe('PUT /profiles/:id', () => {
    let putJSONProfile = (bio) => {
      return mockProfile()
      .then(({userData, profile}) => {
        return request.put(`${API_URL}/profiles/${profile._id}`)
        .set('Authorization', `Bearer ${userData.token}`)   
        .send({bio})
        .then(res => ({res, userData, profile}))
      })
    }

    let putMultipartProfile = (bio) => {
      return mockProfile()
      .then(({userData, profile}) => {
        return request.put(`${API_URL}/profiles/${profile._id}`)
        .set('Authorization', `Bearer ${userData.token}`)   
        .field('bio', bio)
        .attach('avatar', `${__dirname}/asset/test-asset.png`)
        .then(res => ({res, userData, profile}))
      })
    }
    
    test('should update the bio', () => {
      return putJSONProfile('cool beans')
      .then(({res, profile}) => {
        expect(res.status).toEqual(200)
        profile = JSON.parse(JSON.stringify(profile))
        expect(res.body).toEqual({...profile, bio: 'cool beans'})
      })
    })

    test('should update the bio and avatar', () => {
      return putMultipartProfile('cool beans')
      .then(({res, profile}) => {
        expect(res.status).toEqual(200)
        profile = JSON.parse(JSON.stringify(profile))
        expect(res.body._id).toEqual(profile._id)
        expect(res.body.email).toEqual(profile.email)
        expect(res.body.username).toEqual(profile.username)
        expect(res.body.bio).toEqual('cool beans')
        expect(res.body.avatar).not.toEqual(profile.avatar)
      })
    })
  })

  describe('DELETE /profiles/:id', () => {
    test('should return a 204 status', () => {
      return mockProfile()
      .then(({userData, profile}) => {
        return request.delete(`${API_URL}/profiles/${profile._id}`)
        .set('Authorization', `Bearer ${userData.token}`)   
        .then(res => {
          expect(res.status).toEqual(204)
        })
      })
    })

    test('should return a 404 status', () => {
      return mockProfile()
      .then(({userData, profile}) => {
        return request.delete(`${API_URL}/profiles/${userData.user._id}`)
        .set('Authorization', `Bearer ${userData.token}`)   
        .then(res => {throw res})
        .catch(res => {
          expect(res.status).toEqual(404)
        })
      })
    })
  })
})
