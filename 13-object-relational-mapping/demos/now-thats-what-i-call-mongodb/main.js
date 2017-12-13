var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/nowthatsmusic', {useMongoClient: true})

var Track = mongoose.model('Track', {
    artist: String,
    title: String
});

var artistCount = {};
Track.find({}).then(tracks => {
   console.log("TRACK COUNT:", tracks.length);
   for (var track of tracks) {
       console.log("TRACK:", track);
       if (!artistCount[track.artist]) {
         artistCount[track.artist] = [];
       }
       artistCount[track.artist].push(track.title);
   }

   var mostSongs = 0;
   var mostPlayedArtist = undefined;
   for (var artist in artistCount) {
       var songs = artistCount[artist].length
       songs = parseInt(songs, 10);
       console.log(songs, mostSongs, songs > mostSongs, artist);
       if (songs > mostSongs) {
            mostSongs = songs;
            mostPlayedArtist = artist;
       }
   }

   console.log(mostPlayedArtist)
   console.log("played", artistCount[mostPlayedArtist].length, "songs");
   console.log(artistCount[mostPlayedArtist]);
   mongoose.disconnect();
}).catch((err) => {
    console.log(err);
});