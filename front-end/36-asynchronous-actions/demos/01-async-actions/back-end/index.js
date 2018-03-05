'use strict'

require('dotenv').config()

const debug = require('debug')('http:index')
require('./lib/server').start()
