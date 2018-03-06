import User from './user.js'
import Profile from './profile.js'
import Photo from './photo.js'

export default (db) => {
  User(db)
  Profile(db)
  Photo(db)
}
