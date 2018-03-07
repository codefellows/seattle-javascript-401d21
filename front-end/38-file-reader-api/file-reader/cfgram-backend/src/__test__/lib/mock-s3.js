import faker from 'faker'
import AWS from 'aws-sdk-mock'

AWS.mock('S3', 'upload', (params, cb) => {
  if(params.ACL !== 'public-read')
    return cb(new Error('VALIDATION ERROR: ACL must be public read'))

  if(params.Bucket !== 'test-bucket')
    return cb(new Error('VALIDATION ERROR: ACL must be public read'))

  if(!params.Key || !params.Body) 
    return cb(new Error('VALIDATION ERROR: requires Key and Body'))

  return cb(null, { Location: faker.image.avatar() })
})

AWS.mock('S3', 'deleteObject', (params, cb) => {
  if(params.Bucket !== 'test-bucket')
    return cb(new Error('VALIDATION ERROR: ACL must be public read'))

  if(!params.Key) 
    return cb(new Error('VALIDATION ERROR: requires Key'))

  return cb(null, {})
})
