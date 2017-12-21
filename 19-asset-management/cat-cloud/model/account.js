'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto'); // generate random strings
const bcrypt = require('bcrypt'); // hash passwords
const httpErrors = require('http-errors');
const jsonWebToken = require('jsonwebtoken'); //(de)encrypt tokens

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
  created :{
    type : Date,
    default : () => new Date(),
  },
});

accountSchema.methods.verifyPassword = function(password){
  return bcrypt.compare(password,this.passwordHash)
    .then(response => {
      if(!response)
        throw new httpErrors(401,'__AUTH__ incorrect username or password');

      return this;
    });
};

accountSchema.methods.createToken = function(){
  this.tokenSeed = crypto.randomBytes(64).toString('hex');

  return this.save()
    .then(account => {
    // vinicio - here, we know that the tokenSeed is unique
      return jsonWebToken.sign({
        tokenSeed : account.tokenSeed},process.env.CAT_CLOUD_SECRET);
    });
};

const Account = module.exports = mongoose.model('account',accountSchema);

Account.create = (username,email,password) => {
  // vinicio - TODO : validation checks
  const HASH_SALT_ROUNDS = 8;
  return bcrypt.hash(password,HASH_SALT_ROUNDS)
    .then(passwordHash => {
      // vinicio - creating a token seed
      let tokenSeed = crypto.randomBytes(64).toString('hex');
      return new Account({
        username,// vinicio - same as username : username,
        email,
        passwordHash,
        tokenSeed,
      }).save();
    });
  // vinicio - password is GONE!
};