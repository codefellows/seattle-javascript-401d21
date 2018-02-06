'use strict'

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const mongoose = require('mongoose')

const Auth = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  compareHash: {type: String, unique: true},
}, {timestamps: true})


Auth.methods.generatePasswordHash = function(password) {
  if(!password) return Promise.reject(new Error('Authorization failed. Password required.'))

  return bcrypt.hash(password, 10)
  .then(hash => this.password = hash)
  .then(() => this)
  .catch(err => err)
}

Auth.methods.comparePasswordHash = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if(err) return reject(err)
      if(!valid) return reject(new Error('Authorization failed. Password invalid.'))
      resolve(this)
    })
  })
}

Auth.methods.generateCompareHash = function() {
  this.compareHash = crypto.randomBytes(64).toString('hex')
  return this.save()// vinicio - making sure the compare hash (token seed) is unique
    .then(() => Promise.resolve(this.compareHash))
    .catch(console.error); // This line is not very robust... potential loop
  //.catch(() => this.generateCompareHash()); // This line is not very robust... potential loop
};

Auth.methods.generateToken = function() {
  return this.generateCompareHash()
  .then(compareHash => jwt.sign({token: compareHash}, process.env.APP_SECRET))
  .catch(err => err)
}

module.exports = mongoose.model('auth', Auth)