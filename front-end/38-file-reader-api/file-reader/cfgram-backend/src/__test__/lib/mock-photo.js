import faker from 'faker'
import * as _ from 'ramda'
import Photo from '../../model/photo.js'
import {mockProfile} from './mock-profile.js'

export const mockPhoto = () => {
  return mockProfile()
  .then(({profile, userData}) => {
    return new Photo({
      url: faker.image.image(),
      description: faker.lorem.sentence(),
      profile: profile._id,
      owner: userData.user._id, 
    })
    .save()
    .then(photo => ({photo, profile, userData}))
  })
}

export const mockManyPhotos = (count=100) => {
  return Promise.all(_.map(() => mockPhoto(), Array(count)))
  .then(photosData => {
    return _.reduce((result, next) => {
      return {...result, [next.photo._id]: next}
    }, {}, photosData)
  })
}
