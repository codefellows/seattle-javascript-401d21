'use strict';

// vinicio - mongoose is the ORM to connect to mongo
const mongoose = require('mongoose');
const Category = require('./category');
const httpErrors = require('http-errors');

// vinicio - this is the "many" of the 1-to-many relationships
const noteSchema = mongoose.Schema({
  title : {
    type : String,
    required : true,
    unique : true,
  },
  content : {
    type : String,
    required : true,
    minlength : 10,
  },
  timestamp : {
    type : Date,
    default : () => new Date(),
  },
  category : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : 'categorie',
  },
});
//-----------------------------------------------------
// SETTING UP RELATIONSHIP MANAGEMENT
//-----------------------------------------------------
noteSchema.pre('save',function(done){
  // Vinicio - I want to make sure that the category exists before saving a note
  return Category.findById(this.category)
    .then(categoryFound => {
      if(!categoryFound)
        throw httpErrors(404,'category not found');
      
      categoryFound.notes.push(this._id);
      return categoryFound.save();
    })
    .then(() => done())
    .catch(done);// vinicio - this will trigger an error
});

// vinicio - document is the note I JUST removed
noteSchema.post('remove',(document,done) => {
  return Category.findById(document.category)
    .then(categoryFound => {
      if(!categoryFound)
        throw httpErrors(404,'category not found');
      
      categoryFound.notes = categoryFound.notes.filter(note => {
        return note._id.toString() !== document._id.toString();
      });
      return categoryFound.save();
    })
    .then(() => done())
    .catch(done);
});
//-----------------------------------------------------

// vinicio - internally, this becomes 'notes'
module.exports = mongoose.model('note',noteSchema);