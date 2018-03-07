import fs from 'fs-extra'
import User from '../../model/user.js'
import Photo from '../../model/photo.js'
import Profile from '../../model/profile.js'

export default () => Promise.all([
  fs.remove(`${__dirname}/../../../temp/*`),
    User.remove({}),
    Photo.remove({}),
    Profile.remove({}),
  ])

