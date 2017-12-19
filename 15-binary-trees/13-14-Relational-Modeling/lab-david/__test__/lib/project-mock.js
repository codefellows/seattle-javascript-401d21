'use strict';

const faker = require('faker');
const resumeMock = require('./resume-mock');
const Project = require('../../model/project');

const projectMock = module.exports = {};

projectMock.create = () => {
  let mock = {};

  return resumeMock.create()
    .then(resume => {
      mock.resume = resume;

      return new Project({
        title : faker.company.bsNoun(2),
        year : 2017,
        languages : faker.database.engine(3).split(' '),
        description : faker.company.catchPhrase(10),
        resume : resume._id,
      }).save();
    })
    .then(project => {
      mock.project = project;
      return mock;
    });
};

projectMock.createMany = (creationCount) => {
  let mock = {};
  
  return resumeMock.create()
    .then(resume => {
      mock.resume = resume;
  
      return Promise.all(new Array(creationCount)
        .fill(0)
        .map(() => {
          return new Project({
            title : faker.company.bsNoun(2),
            year : faker.date.soon,
            
            languages : faker.database.engine(3).split(' '),
            
            description : faker.company.catchPhrase(10).split(' '),
            resume : resume._id,
          }).save();
        }));
    })
    .then(project => {
      mock.project = project;
      return project;
    });
};

projectMock.remove = () => Promise.all([
  Project.remove({}),
  resumeMock.remove(),
]);