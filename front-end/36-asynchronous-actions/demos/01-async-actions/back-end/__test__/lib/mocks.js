'use strict'

const faker = require('faker')
const Album = require('../../model/album')
const Track = require('../../model/track')

const mock = module.exports = {}

// Album Mocks - One, Many, RemoveAll
mock.album = {}

mock.album.createOne = () => new Album({ name: faker.hacker.adjective() }).save()

mock.album.createMany = n =>
  Promise.all(new Array(n).fill(0).map(mock.album.createOne))

mock.album.removeAll = () => Promise.all([Album.remove()])


// Track Mocks - One, Many, RemoveAll
mock.track = {}

mock.track.createOne = () => {
  let result = {}

  return mock.album.createOne()
  .then(album => {
    result.album = album
    return new Track({
      artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
      title: faker.hacker.ingverb(),
      album: album._id.toString(),
    }).save()
  })
  .then(track => result.track = track)
  .then(() => result)
}

mock.track.createMany = n => {
  let result = {}

  return mock.album.createOne()
  .then(album => {
    result.album = album
    let trackProms = new Array(n).fill(0).map(() => new Track({
      artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
      title: faker.hacker.ingverb(),
      album: album._id.toString(),
    }).save())
    return Promise.all(trackProms)
  })
  .then(tracks => result.tracks = tracks)
  .then(() => result)
}

mock.track.removeAll = () => Promise.all([Track.remove()])
