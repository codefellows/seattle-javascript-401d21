'use strict';

const mongoose = require('mongoose');
const Resume = require('./resume');
const httpErrors = require('http-errors');

const projectSchema = mongoose.Schema({
  title : {
    type: String,
    required: true,
    unique: true,
  },
  year : {
    type : Number,
    required : true,
  },

  languages : [{type : String }],

  description : {type : String},
   
  resume : {
    type: mongoose.Schema.Types.ObjectId,
    required : true,
    ref : 'resume',
  },
});

projectSchema.pre('save', function(done){
  return Resume.findById(this.resume)
    .then(resumeLocated => {
      if(!resumeLocated)
        throw httpErrors(404, 'resume not found');

      resumeLocated.projects.push(this._id);
      return resumeLocated.save();
    })
    .then(() => done())
    .catch(done);
});

projectSchema.post('remove', (document, done) => {
  return Resume.findById(document.resume)
    .then(resumeLocated => {
      if(!resumeLocated)
        throw httpErrors(404, 'resume not located');

      resumeLocated.projects = resumeLocated.projects.filter(project => {
        return project._id.toString() !== document._id.toString();
      });
      return resumeLocated.save();
    })
    .then(() => done())
    .catch(done);
});

module.exports = mongoose.model('project', projectSchema);