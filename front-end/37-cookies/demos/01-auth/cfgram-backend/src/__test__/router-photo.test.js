import * as _ from 'ramda'
import request from 'superagent'
import cleanDB from './lib/clean-db.js'
import * as server from '../lib/server.js'
import {mockProfile} from './lib/mock-profile.js'
import {mockPhoto, mockManyPhotos} from './lib/mock-photo.js'

const API_URL = process.env.API_URL

describe('router-photo.test.js', () => {
  beforeAll(server.start)
  afterAll(server.stop)
  afterEach(cleanDB)

  describe('POST /api/photos', () => {
    test('should create a photo', () => {
      return mockProfile()
      .then(({userData, profile}) => {
        return request.post(`${API_URL}/photos`)
        .set('Authorization', `Bearer ${userData.token}`)
        .attach('photo', `${__dirname}/asset/test-asset.png`)
        .field('description', 'example data')
        .then(res => {
          expect(res.status).toEqual(200)
          profile = JSON.parse(JSON.stringify(profile))
          expect(res.body.owner).toEqual(userData.user._id.toString())
          expect(res.body.profile).toEqual(profile)
          expect(res.body.url).toBeTruthy()
          expect(res.body.description).toEqual('example data')
          expect(res.body.comments).toEqual([])
        })
      })
    })

    test('should respond with 400', () => {
      return mockProfile()
      .then(({userData, profile}) => {
        return request.post(`${API_URL}/photos`)
        .set('Authorization', `Bearer ${userData.token}`)
        .field('description', 'example data')
        .then(res => {throw res})
        .catch(res => {
          expect(res.status).toEqual(400)
        })
      })

    })

    test('should respond with 400', () => {
      return mockProfile()
      .then(({userData, profile}) => {
        return request.post(`${API_URL}/photos`)
        .set('Authorization', `Bearer ${userData.token}`)
        .attach('photo', `${__dirname}/asset/test-asset.png`)
        .then(res => {throw res})
        .catch(res => {
          expect(res.status).toEqual(400)
        })
      })
    })
  })

  describe('GET /api/photos', () => {
    let fetchPage = (page) => {
      return request(`${API_URL}/photos?page=${page}`)
      .catch(err => err)
    }

    let compareBodyWithMock = (body , mock) => {
      _.forEach((photo) => {
        let mockPhoto = JSON.parse(JSON.stringify(mock[photo._id]))
        expect(photo._id).toEqual(mockPhoto.photo._id)
        expect(photo.owner).toEqual(mockPhoto.photo.owner)
        expect(photo.description).toEqual(mockPhoto.photo.description)
        expect(photo.url).toEqual(mockPhoto.photo.url)
        expect(photo.profile).toEqual(mockPhoto.profile)
      })(body)
    }

    test('should respond with 100 photos', () => {
      return mockManyPhotos()
      .then(photosData => {
        return fetchPage(1)
        .then(res => {
          expect(res.status).toEqual(200)
          expect(res.body.count).toEqual(100)
          expect(res.body.prev).toEqual(null)
          expect(res.body.next).toEqual(null)
          expect(res.body.last).toEqual(`${API_URL}/photos?page=1`)
          compareBodyWithMock(res.body.data, photosData)
        })
      })
    })

    test('should respond with 50 photos', () => {
      return mockManyPhotos(150)
      .then(photosData => {
        return fetchPage(2)
        .then(res => {
          expect(res.status).toEqual(200)
          expect(res.body.count).toEqual(150)
          expect(res.body.prev).toEqual(`${API_URL}/photos?page=1`)
          expect(res.body.next).toEqual(null)
          expect(res.body.last).toEqual(`${API_URL}/photos?page=2`)
          expect(res.body.data.length).toEqual(50)
          compareBodyWithMock(res.body.data, photosData)
        })
      })
    })
  })

  describe('GET /api/photos/:id', () => {
    test('should fetch a photo', () => {
      return mockPhoto()
      .then(mock => {
        return request.get(`${API_URL}/photos/${mock.photo._id}`)
        .then(res => {
          expect(res.status).toEqual(200)
        })
      })
    })

    test('should 404', () => {
      return mockPhoto()
      .then(mock => {
        return request.get(`${API_URL}/photos/${mock.photo.owner}`)
        .catch(res => res)
        .then(res => {
          expect(res.status).toEqual(404)
        })
      })
    })
  })

  describe('PUT /api/photos/:id', () => {
    test('should respond with updated photo', () => {
      return mockPhoto()
      .then(mock => {
        return request.put(`${API_URL}/photos/${mock.photo._id}`)
        .set('Authorization', `Bearer ${mock.userData.token}`)
        .attach('photo', `${__dirname}/asset/test-asset.png`)
        .field('description', 'cool beans')
        .then(res => {
          expect(res.status).toEqual(200)
          expect(res.body._id).toEqual(mock.photo._id.toString())
          expect(res.body.description).toEqual('cool beans')
          expect(res.body.url).not.toEqual(mock.photo.url)
        })
      })
    })

    test('should respond with updated photo', () => {
      return mockPhoto()
      .then(mock => {
        return request.put(`${API_URL}/photos/${mock.photo._id}`)
        .set('Authorization', `Bearer ${mock.userData.token}`)
        .attach('photo', `${__dirname}/asset/test-asset.png`)
        .attach('photo', `${__dirname}/asset/test-asset.png`)
        .field('description', 'cool beans')
        .catch(res => res)
        .then(res => {
          expect(res.status).toEqual(400)
        })
      })
    })
  })

  describe('DELETE /api/photos/:id', () => {
    test('should delete a photo', () => {
      return mockPhoto()
      .then(mock => {
        return request.delete(`${API_URL}/photos/${mock.photo._id}`)
        .set('Authorization', `Bearer ${mock.userData.token}`)
        .then(res => {
          expect(res.status).toEqual(204)
        })
      })
    })

    test('should 404', () => {
      return mockPhoto()
      .then(mock => {
        return request.delete(`${API_URL}/photos/${mock.photo.owner}`)
        .set('Authorization', `Bearer ${mock.userData.token}`)
        .catch(res => res)
        .then(res => {
          expect(res.status).toEqual(404)
        })
      })
    })
  })

})
