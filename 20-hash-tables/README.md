![cf](http://i.imgur.com/7v5ASc8.png) 20: Hash Tables
===

# Learning Objectives
* Students will be able to identify use cases for a hash table
* Students will be able to implement a hash table
* Students will be able to implement a custom hash code
* Students will be able to implement collision handling

## Resources
* Watch [What is a Hash Table?](https://www.youtube.com/watch?v=MfhjkfocRR0)
* Read [Basics of Hash Tables](https://www.hackerearth.com/practice/data-structures/hash-tables/basics-of-hash-tables/tutorial/)
* Skim [Wikipedia: Hash Table](https://en.wikipedia.org/wiki/Hash_table)

#### Hash Tables
Hash Tables (also called "Hash Maps", or even just a "Dictionary") are an
incredibly powerful data structure that offer us `O(1)` read and `O(1)` write
access. Yes, you read that correctly. They're incredibly efficient.

Hash maps provide a way for us to store key/value pairs. The `{}` objects in
JavaScript are JavaScript's own native implementation of hash maps.

```js
let key = "U District"
let value = 98105
let hashMap = {}
hashMap[key] = value;
console.log(hashMap[key]);
```

Now let's imagine JavaScript didn't give us these objects for free, and let's
find out how to build our own!

#### Hash Table API
A hash table should support at least the following methods:

* `.put(key, value)` - store a value with the given key
* `.get(key)` - get the value associated with the given key
* `.update(key, value)` - modify the value associated with the given key
* `.remove(key)` - delete a value associated with a key
* `.keys()` - return a collection of all the keys

#### O(N) Lookup vs O(1) Lookup
Let's say we have data of Seattle neighborhood names and their corresponding zip
codes.

```js
["Greenwood:98103", "Downtown:98101", "Alki Beach:98116", "Bainbridge Island:98110", ...]
```

Now we want to be able to search through the data to look up a neighborhood and
obtain it's zip code. We could do this using a for loop that looks through each
piece of data one by one until it finds the neighborhood name, then returns the
zip code there. This would be an `O(N)` read operation because it requires
searching through each piece of data to find the one piece we want.

Arrays actually have fast access. If we know the index of the information we
want we can access that information in `O(1)` time. The reason why searching
for an piece of data in a collection is `O(N)` isn't because the array is slow,
it's just that we have to look through all `N` things in the collection.

Hash maps take advantage of an array's `O(1)` read access. Instead of adding
elements to an array from beginning to end a hash map uses a "hash function" to
place each item at a precise index location, based off it's key.

Basically, the hash function takes a key and returns an integer. We use the
integer to determine where the key/value pair should be placed in the array.
The hash code is calculated in constant time and writing to an array at one
index is `O(1)` so the hash map has `O(1)` access.

The hash code is used again to read something from the hash map. Take the key,
run it through the hash code to get a number, use that number to index the
array. Calculating the hash code and reading an array at that index is all
constant time to the hash map has `O(1)` read access!
  
#### Calculating Hash Codes
Basically, a hash code turns a key into an integer. It's very important that
hash codes are deterministic: their output is determined only by their input.
Hash codes should never have randomness to them. The same key should always
produce the same hash code.

* Implement two simple hash codes for Strings:
  * Sum the ascii values of each character
    * `CAT` becomes `99 + 97 + 116` becomes `312`
  * Multiply the ascii values of each character
    * `CAT` becomes `99 * 97 * 116` becomes `1113948`
    
```js
function sumHash(str) {
  return str.split('').reduce((a,b)=>a + b.charCodeAt(0), 0)
}

function multHash(str) {
  return str.split('').reduce((a,b)=>a * b.charCodeAt(0), 1)
}
```

#### Using Hash Codes With Buckets
The array inside the hash map can be any size. Whenever a key/value pair is
`.put()` in the hash map the hash map calculates the hash of the key, uses the
modulus operator to constrain the key to be within the range of indexes in the
array, and stores the value. It does the same thing to find the index when it
goes to read a key/value pair.

Notice that the buckets (each index of the array) all start `null`. The hash
table starts each bucket empty and overwrites their value once a key generates
a hashCode that corresponds with an index.

Notice that if you ever try to `.get(key)` a key that hasn't been written the
hashMap will simply return null. Since the hash of each `key` is guaranteed to
always be the same if the array is empty where the key's hash resolves to an
index then it must not have been `.put(key, val)` in the hash map yet.

```js
this.buckets = [null, null, null, null, null, null, null];

put(key, value) {
  let hash = sumHash(str);
  let index = hash % this.buckets.length;
  this.buckets[index] = value;
}

get(key) {
  let hash = sumHash(str);
  let index = hash % this.buckets.length;
  return this.buckets[index];
}
```

#### Collisions
The example above is actually a bit simplified. There's one more thing hash maps
have to deal with. What would happen if two different keys resolved to be the
same index of the array? This is called a collision. The hash map needs to be
able to handle two keys resolving to the same index.

If two keys ever ultimately resolved to the same index then two calls to
`.put(key, val)` with different keys would overwrite each other.

Collisions are solved by changing the initial state of the buckets. Instead of
starting them all as `null` we can initialize a `LinkedList` in each one! Now
if two keys resolve to the same index in the array then their key/value pairs
can be stored as a node in a linked list. Each index in the array is called a
"bucket" because it can store multiple key/value pairs.

Since different keys can lead to the same bucket it's important to store the
entire key/value pair in the bucket, not just the value. The key must be stored
with the value! If only values were stored in buckets then it would be
impossible to determine which value to return when a key led you to a bucket.

This is similar to the original neighborhood names stored in an array with their
zip codes shown earlier.

Here's an actual example of just one bucket in a real hash map. In this example
the two different keys `"Pioneer Square"` and `"Alki Beach"` happen to
ultimately resolve to the same bucket. When we look at the bucket we see a
representation of the Linked List that exists there. Pioneer Square was added
first, so it's at the front of the list. Then there's Alki Beach as the second
element in the linked list. Notice that both of them store the entire
key/value pair.

```js
hashMap.put("Pioneer Square", 98104);
hashMap.put("Alki Beach", 98116);
```

```
Bucket 92: [{Pioneer Square->98104}, {Alki Beach->98116}]
```

If we didn't store the key, the bucket would look like this. Accessing
`.get("Pioneer Square")` or `.get("Alki Beach")` would hash the keys and still
lead to bucket 92, but it would be impossible to tell which of the zip code
values there to return.

```
Bucket 92: [98104, 98116]
```

Hash maps do this to store values:
* Accept a key
* Calculate the hash of the key
* Use modulus to convert the hash into an array index
* Store the key **with** the value by appending both to the end of a linked list

Hash maps do this to read value:
* Accept a key
* Calculate the hash of the key
* Use modulus to convert the hash into an array index
* Use the array index to access the short LinkedList representing a bucket
* Search through the bucket looking for a node with a key/value pair that
  matches the key you were given
    
#### Hash Code Examples
Consider these examples running Seattle neighborhood names as Strings through
two different hash functions.

Notice that although `"Pioneer Square"` and `"Alki Beach"` have different
sum hashes they ultimately resolve to the same bucket index. Their hashes
modulo `buckets.length` (to turn them into legitimate array indexes) are equal
and they ultimately collide.

Calculating hashes and indexes by summing the ascii values of each character:

```
SUM HASHED: Pioneer Square = 1379
SUM HASHED: Alki Beach = 884
SUM HASHED: U District = 955

BUCKET SIZE=99
SUM INDEX: 1379 % 99 = 92
SUM INDEX:  884 % 99 = 92
SUM INDEX:  995 % 99 = 64
```

Calculating hashes and indexes by multiplying the ascii values of each character:

```
MULT HASHED: Pioneer Square = 599126016
MULT HASHED: Alki Beach = 1062823936
MULT HASHED: U District = 578867200

BUCKET SIZE=99
MULT INDEX:  599126016 % 99 = 93
MULT INDEX: 1062823936 % 99 = 31
MULT INDEX:  578867200 % 99 = 43
```

#### Bucket Sizes
Hash Maps can have any number of buckets. If a hash map has only a few buckets
it will be densely full and have many collisions. If a hash map has more buckets
it will be more sparsely populated, there will be less collisions, but there
may be a lot of extra empty space.

It's possible to compute the "load factor" of a hash table. The load factor
tells us something about how full the hash table is. A hash table can start with
only a few buckets, calculate it's own load factor, recognize when it gets too
full and automatically grow and add more buckets to itself to accommodate more
data.

**Recognize:** calculating load factors and choosing the optimal number of
buckets, and determining the best hash functions is not within the scope of this
class. This class intends to introduce you to what a hash table is, how it's
implemented, what hash codes are, how to handle collisions and how to reason
generally about what it means for a hash table to be more empty or more full.
This class does not intend to calculate theoretical optimal performance limits
for how to best balance a Hash Table.

Here's what the same information looks like in two different hash tables. The
first hash table only has 7 buckets. The second has 100 buckets. Notice that
even though the second hash table has 100 buckets there are still some
collisions. Collisions are ok! We just don't want **every** key to hash to the
exact same index. That would be literally the worst!

7 buckets:

```
Bucket 0: [{Renton->98055},{Capital Hill->98102},{Greenwood->98103},{Greenlake->98103},{Pioneer Square->98104},{University District->98105},{Columbia City->98118}]
Bucket 1: [{Bellevue->98005},{Seattle->98101}]
Bucket 2: [{Mercer Island->98040},{Alki Beach->98116},{Northgate->98125}]
Bucket 3: [{Downtown->98101},{Laurelhurst->98105},{Bainbridge Island->98110},{Magnolia->98199}]
Bucket 4: [{Kirkland->98033},{Lynnwood->98037},{Ballard->98107},{Queen Anne->98109},{West Seattle->98116}]
Bucket 5: [{International District->98104},{Mount Baker->98144}]
Bucket 6: [{Redmond->98052},{Freemont->98103},{South Lake Union->98109},{Madrona->98110},{Belltown->98121}]
```

100 buckets:

```
Bucket 0: []
Bucket 1: []
Bucket 2: []
Bucket 3: []
Bucket 4: []
Bucket 5: []
Bucket 6: []
Bucket 7: []
Bucket 8: []
Bucket 9: []
Bucket 10: []
Bucket 11: []
Bucket 12: [{South Lake Union->98109}]
Bucket 13: [{Madrona->98110}]
Bucket 14: []
Bucket 15: []
Bucket 16: [{Magnolia->98199}]
Bucket 17: []
Bucket 18: []
Bucket 19: [{Greenlake->98103}]
Bucket 20: [{Redmond->98052}]
Bucket 21: []
Bucket 22: []
Bucket 23: []
Bucket 24: [{Kirkland->98033}]
Bucket 25: []
Bucket 26: []
Bucket 27: []
Bucket 28: [{Bellevue->98005}]
Bucket 29: [{Seattle->98101}]
Bucket 30: []
Bucket 31: []
Bucket 32: []
Bucket 33: []
Bucket 34: []
Bucket 35: []
Bucket 36: [{Renton->98055}]
Bucket 37: [{Queen Anne->98109}]
Bucket 38: [{Capital Hill->98102}]
Bucket 39: []
Bucket 40: [{Freemont->98103}]
Bucket 41: []
Bucket 42: []
Bucket 43: []
Bucket 44: []
Bucket 45: []
Bucket 46: []
Bucket 47: [{Greenwood->98103},{Belltown->98121}]
Bucket 48: []
Bucket 49: [{Northgate->98125}]
Bucket 50: [{Bainbridge Island->98110}]
Bucket 51: []
Bucket 52: []
Bucket 53: [{Mercer Island->98040}]
Bucket 54: []
Bucket 55: []
Bucket 56: []
Bucket 57: []
Bucket 58: [{Mount Baker->98144}]
Bucket 59: []
Bucket 60: [{International District->98104}]
Bucket 61: []
Bucket 62: []
Bucket 63: []
Bucket 64: []
Bucket 65: [{Columbia City->98118}]
Bucket 66: [{Lynnwood->98037}]
Bucket 67: []
Bucket 68: []
Bucket 69: []
Bucket 70: []
Bucket 71: []
Bucket 72: [{Downtown->98101}]
Bucket 73: []
Bucket 74: []
Bucket 75: []
Bucket 76: []
Bucket 77: []
Bucket 78: []
Bucket 79: [{University District->98105}]
Bucket 80: []
Bucket 81: []
Bucket 82: []
Bucket 83: []
Bucket 84: [{West Seattle->98116}]
Bucket 85: []
Bucket 86: []
Bucket 87: []
Bucket 88: []
Bucket 89: []
Bucket 90: [{Laurelhurst->98105}]
Bucket 91: []
Bucket 92: [{Pioneer Square->98104},{Alki Beach->98116}]
Bucket 93: []
Bucket 94: []
Bucket 95: []
Bucket 96: [{Ballard->98107}]
Bucket 97: []
Bucket 98: []
```
