var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true })
  .then(main)
  .catch(err => console.log(err.message));

function createCat() {
  // Create something to model Cats
  var Cat = mongoose.model('Cat', { name: String, sound: String });
  Cat.remove().then(()=> {
    // Create a cat, save it to the database and read it.
    var kitty = new Cat({ name: 'Zildjian', sound: 'meow'});
    kitty.save(function (err, savedCat) {
      if (err) {
        console.log(err);
      } else {
        console.log(savedCat.name, 'says', savedCat.sound);
        console.log();

        Cat.find().then(cats => {
          console.log(cats);
          console.log();

          // define the key/values to update
          var params = {name: 'Happy Zildjian', sound: 'purr'};

          // set "new" to true to retrieve the new updated version
          // of the document instead of the original version.
          // DOCS: http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
          var opts = {"new": true};

          Cat.findByIdAndUpdate(savedCat.id, params, opts).then(cat => {
            console.log("Updated:", cat);
            mongoose.disconnect();
          });
        });
      }
    });
  });
}


function main() {
  createCat();
}
