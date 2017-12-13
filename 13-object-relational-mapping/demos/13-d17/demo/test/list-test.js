'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const List = require('../model/list.js');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

//process.env.MONGODB_URI = 'mongodb://localhost/listofnotes';

mongoose.Promise = Promise;
require('../server.js');

const url = `http://localhost:${PORT}`;
const exampleList = {
  name: 'test list name'
}

describe('List Routes', function() {
  describe('POST: /api/list', function() {
    describe('with a valid req body', function() {
      after( done => {
        if (this.tempList) {
          List.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a list', done => {
        request.post(`${url}/api/list`)
        .send(exampleList)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test list name');
          this.tempList = res.body;
          done();
        });
      });
    });
  });

  describe('GET: /api/list/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        exampleList.timestamp = new Date();
        new List(exampleList).save()
        .then( list => {
          this.tempList = list;
          done();
        })
        .catch(done);
      });

      after( done => {
        delete exampleList.timestamp;
        if (this.tempList) {
          List.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a list', done => {
        request.get(`${url}/api/list/${this.tempList._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test list name');
          done();
        });
      });
    });
  });
});
