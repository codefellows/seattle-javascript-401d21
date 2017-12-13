# Manual Mongo
Install the useful Robo 3T Mongo UI tool to be able to view information in
your database easily.

Import the JSON data with `mongoimport`. Make sure `mongod` is running
somewhere else so Mongo is running and ready to accept imports!

```
mongoimport --jsonArray --db nowthatsmusic --collection tracks now-thats-what-i-call-music.json
```

Write a function to find the most played artist. Instead of trying to figure
out how to calculate aggregates and grouping artists using a Mongo query we
use `.find({})` to grab all the information and process it manually with
JavaScript. Being able to manipulate and extract information manually is a
useful skill that unbinds us from the limitations of syntax!
