![cf](http://i.imgur.com/7v5ASc8.png) 14: Relationship Modeling
===

## Learning Objectives
* Students will learn about realtionship modeling
* Students will be ablue to create one to one, one to many, and many to many model relationships using a MongoDB ODM

## Resources
* Read [mongoose populate docs](http://mongoosejs.com/docs/populate.html)
* Skim [mongoose api docs](http://mongoosejs.com/docs/api.html)

## Model Relationships
When the modeling real world as data you will quickly discover that data has relationships to other data. Infact in the real world it is rare, if not impossible, for something to exist that has no relationships to other things. On the other hand in theretical world we can describe a thing with out describing its relationships to other things. Software enginers have discoverd useful ways to discribe the relationships (or lack of) between data that can easily be maped to a database. 

#### One 
A Model that stands on its own. A web app example includes a simple Note that has no relationship with any other model, It contains all the data it needs.

```
Note
  id: 1
  content 'get milk and cookies.'
```

#### One to One
When a Model Foo that is related to a sigle Model Bar. Some web app examples include every user having a single profile, every profile having a single profile photo, every client is limited to a single contact email. 

```
User 
  id: 888
  username: slugbyte
  profileID: 123

Profile 
  id: 123
  bio: 'i love javascript'
  url: 'www.codefellows.com'
  userID: 888
```

#### One to Many
A Model Foo that is realted to many Bar Models. Some web app examples include every user having may posts but posts have a singe user, every photo having many comments but each comment is to a single photo, every post having many likes but each like is to a single post.

```
Photo
  id: 5678
  url: 'www.example.com/image/sunset.jpg'
  comments: [ 44 65 78 ]

Comment
  id: 44
  content: 'SO MUCH BEAUTY! <3'

Comment
  id: 65
  content: 'awesome photo'
  
Comment
  id: 78
  content: 'LUL, look at the clouds'
```
  
  
#### Many to Many
Many Foo modles that can each have relationships to many Bar Models. A web app examples includes every user having a relation ship with many friends and each of those users have relationships with a many different freinds. 

Some databases (including mongodb) do not nativly support models having many to many relationships, but many to many can still be created through the use of a second model.

###### Using One Model
```
User 
  id: 1234
  username: 'teapot'
  organisations: [ 1001 3333 4321 ]

Organization 
  id: 1001
  username: 'codefellows'
  users: [ 1234 5000 ]
```

###### Using A Second Model
```
User 
  id: 1234
  username: 'teapot'
  membership: 33

Orginazation 
  id: 1001
  username: 'codefellows'
  membership: 33
  
Membership
  id: 33
  user: 1234
  organization: 1001
```
