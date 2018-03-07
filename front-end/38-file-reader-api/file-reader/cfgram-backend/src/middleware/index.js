'use strict'

// DEPENDENCIES
import cors from 'cors'
import morgan from 'morgan'
import {Router} from 'express'
import cookieParser from 'cookie-parser'
import routerAuth from './router-auth.js'
import fourOhFour from './four-oh-four.js'
import routerPhoto from './router-photo.js'
import errorHandler from './error-handler.js'
import routerProfile from './router-profile.js'
import bindResponseMethods from './bind-response-methods.js'

// INTERFACE
export default new Router()
.use([
  // GLOBAL MIDDLEWARE
  cors({
    origin: process.env.CORS_ORIGINS.split(' '),
    credentials: true,
  }),
  morgan('dev'),
  cookieParser(),
  bindResponseMethods,
  // ROUTERS 
  routerAuth,
  routerPhoto,
  routerProfile,
  // ERROR HANDLERS
  fourOhFour, 
  errorHandler,
])
