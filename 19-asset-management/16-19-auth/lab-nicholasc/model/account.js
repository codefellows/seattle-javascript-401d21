'use strict';
//NOTE:debugged this file
const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const httpErrors = require('http-errors');
const jsonWebToken = require('jsonwebtoken');

const accountSchema = mongoose.Schema({
  passwordHash : {
    type : String,
    required : true,
  },
  email : {
    type : String,
    required : true,
    unique : true,
  },
  username : {
    type : String,
    required : true,
    unique : true,
  },
  tokenSeed : {
    type : String,
    required : true,
    unique : true,
  },
  created : {
    type : Date,
    default : () => new Date(),
  },
});

accountSchema.methods.verifyPassword = function(password){
  return bcrypt.compare(password, this.passwordHash)
    .then(response => {
      if(!response)
        throw new httpErrors(401, '__AUTH__ incorrect username or password');

      return this;
    });
};

accountSchema.methods.createToken = function(){
  this.tokenSeed = crypto.randomBytes(64).toString('hex');
  return this.save()
    .then(account => {
      return jsonWebToken.sign({
        tokenSeed : account.tokenSeed,
      }, process.env.CAT_CLOUD_SECRET);
    });
};

const Account = module.exports = mongoose.model('account', accountSchema);

Account.create = (username, email, password) => {
  //nicholas TODO: error checking
  const HASH_SALT_ROUNDS = 8;
  return bcrypt.hash(password, HASH_SALT_ROUNDS)
    .then(passwordHash => {
      let tokenSeed = crypto.randomBytes(64).toString('hex');
      return new Account({
        username,
        email,
        passwordHash,
        tokenSeed,
      }).save();
    });
};
