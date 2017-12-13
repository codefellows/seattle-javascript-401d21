'use strict'

// load test env
require('dotenv').config({path: `${__dirname}/../.test.env`})

// npm modules
const faker = require('faker')
const expect = require('expect')
const superagent = require('superagent')

// app modules
const server = require('../lib/server.js')
const clearDB = require('./lib/clear-db.js')
const mockList = require('./lib/mock-list.js');

// module constants
let tempList;
const API_URL = process.env.API_URL

// test logic

describe('testing /api/lists', () => {
  before(server.start)
  after(server.stop)
  afterEach(clearDB)

  describe('testing POST /api/lists', () => {
    let data = {title: faker.name.title()}
    it('should respond with a list', () => {
      return superagent.post(`${API_URL}/api/lists`)
      .send(data)
      .then(res => {
        console.log('data', data)
        expect(res.status).toEqual(200)
        expect(res.body.title).toEqual(data.title)
        expect(res.body.tasks).toEqual([])
        expect(res.body._id).toExist()
      })
    })
  })

  describe('testing GET /api/lists/:id', () => {
    it('should respond with a list', () => {
      let tempList;
      return mockList.createOne()
      .then(list => {
        tempList = list;
        return superagent.get(`${API_URL}/api/lists/${list._id}`)
      })
      .then(res => {
        expect(res.status).toEqual(200)
        expect(res.body.title).toEqual(tempList.title)
        expect(res.body.tasks).toEqual([])
        expect(res.body._id).toExist()
      })
    })
  })

  describe('testing GET /api/lists', () => {
    it('should respond with a an array of 50 list', () => {
      let tempLists
      return mockList.createMany(100)
      .then(lists => {
        tempLists = lists;
        return superagent.get(`${API_URL}/api/lists`)
      })
      .then(res => {
        console.log(res.body.map(list => list.title))
        expect(res.status).toEqual(200)
        expect(res.body.length).toEqual(50)
        res.body.forEach(list => {
          expect(list._id).toExist()
          expect(list.tasks).toEqual([])
          expect(list.title).toExist()
        })
      })
    })

    it('should respond with a an array of 50 list', () => {
      let tempLists
      return mockList.createMany(100)
      .then(lists => {
        tempLists = lists;
        return superagent.get(`${API_URL}/api/lists?page=2`)
      })
      .then(res => {
        console.log(res.body.map(list => list.title))
        expect(res.status).toEqual(200)
        expect(res.body.length).toEqual(50)
        //expect(res.body[0].title[0] > 'a').toBeTruthy()
        res.body.forEach(list => {
          expect(list._id).toExist()
          expect(list.tasks).toEqual([])
          expect(list.title).toExist()
        })
      })
    })
    
    it('should respond with a an array of 50 list', () => {
      let tempLists
      return mockList.createMany(100)
      .then(lists => {
        tempLists = lists;
        return superagent.get(`${API_URL}/api/lists?page=3`)
      })
      .then(res => {
        console.log(res.body.map(list => list.title))
        expect(res.status).toEqual(200)
        expect(res.body.length).toEqual(0)
      })
    })
  })
})






















