'use strict'

import faker from 'faker'
import User from '../../model/user.js'

export const mockUser = () => {
  let result = { password: faker.internet.password() }
  return User.create({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: result.password,
    randomHash: faker.random.uuid(),
  })
  .then(user => {
    result.user = user
    return user.tokenCreate()
  })
  .then(token => {
    result.token = token 
    return result
  })
}
