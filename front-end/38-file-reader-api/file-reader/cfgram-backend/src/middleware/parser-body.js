// DEPENDENCIES
import multer from 'multer'
import bodyParser from 'body-parser'
import createError from 'http-errors'

const upload = multer({dest: `${__dirname}/../../temp`})

// INTERFACE
export default (req, res, next) => {
  let contentType = req.headers['content-type']

  if(contentType.indexOf('application/json') > -1)
    return bodyParser.json()(req, res, next)

  if(contentType.indexOf('multipart/form-data') > -1)
    return upload.any()(req, res, next) 

  next(createError(400, 
    `VALIDATION ERROR: content-type (${contentType}) not supported`))
}
