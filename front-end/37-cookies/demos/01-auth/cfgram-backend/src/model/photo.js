import * as _ from 'ramda'
import * as util from '../lib/util.js'
import createError from 'http-errors'
import Mongoose, {Schema} from 'mongoose'

const photoSchema = new Schema({
  url: {type: String, required: true},
  description: {type: String, required: true},
  owner: {type: Schema.Types.ObjectId, required: true},
  profile: {type: Schema.Types.ObjectId, required: true, ref: 'profile'},
  comments: [{type: Schema.Types.ObjectId}],
})

const Photo = Mongoose.model('photo', photoSchema) 

Photo.validateRequest = function(req){
  if(req.method === 'POST' && !req.files)
    return Promise.reject(createError(400, 'VALIDATION ERROR: must have a file'))

  if(req.method === 'POST' && req.files.length < 1)
    return Promise.reject(createError(400, 'VALIDATION ERROR: must have a file'))

  if(req.files.length > 1) {
    let err = createError(400, 'VALIDATION ERROR: must have one file')
    return util.removeMulterFiles(req.files)
    .then(() => {throw err})
  }

  let [file] = req.files
  if(file){
    if(file.fieldname !== 'photo'){
      let err = createError(400, 'VALIDATION ERROR: file must be on field photo')
      return util.removeMulterFiles(req.files)
      .then(() => {throw err})
    }
  }

  return Promise.resolve(file)
}

Photo.create = function(req){
  return Photo.validateRequest(req)
  .then(file => {
    return util.s3UploadMulterFileAndClean(file)
    .then(s3Data => {
      return new Photo({
        owner: req.user._id,
        profile: req.user.profile,
        url: s3Data.Location,
        description: req.body.description,
      }).save()
    })
  })
  .then(photo => {
    return Photo.findById(photo._id)
    .populate('profile')
  })
}

Photo.fetch = util.pagerCreate(Photo, 'comments profile')

Photo.fetchOne = function(req){
  return Photo.findById(req.params.id)
  .populate('profile comments')
  .then(photo => {
    if(!photo)
      throw createError(404, 'NOT FOUND ERROR: photo not found') 
    return photo
  })
}

Photo.updatePhotoWithFile = function(req){
  return Photo.validateRequest(req)
  .then(file => {
    return util.s3UploadMulterFileAndClean(file)
    .then(s3Data => {
      let update = {url: s3Data.Location}
      if(req.body.description) update.description = req.body.description 
      return Photo.findByIdAndUpdate(req.params.id, update, {new: true, runValidators: true})
    })
  })
}

Photo.update = function(req){
  if(req.files && req.files[0])
    return Photo.updatePhotoWithFile(req)
    .then(photo => {
      return Photo.findById(photo._id)
      .populate('comments profile')
    })
  let options = {new: true, runValidators: true}
  let update = {description: req.body.description}
  return Photo.findByIdAndUpdate(req.params.id, update, options)
  .then(photo => {
    return Photo.findById(photo._id)
    .populate('comments profile')
  })
}

Photo.delete = function(req){
  return Photo.findOneAndRemove({_id: req.params.id, owner: req.user._id})
  .then(profile => {
    if(!profile)
      throw createError(404, 'NOT FOUND ERROR: profile not found')
  })
}

export default Photo

