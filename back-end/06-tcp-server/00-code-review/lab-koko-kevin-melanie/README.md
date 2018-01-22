# 04 Bitmap Project

This is an application that offers a selection of transformations to apply to a bitmap image.


## dazzle! - a command line bitmap transformer

---

The dazzle command line utility allows the user to transform a bitmap image using any of the nine transform methods.  A new copy of the image is created with the supplied name.

### dazzle takes three arguments

  - <bitmap_file_path>  the path to a bitmap image to transform

  - <new-file-name>   the name for the new bitmap image without an extension

  - <transform-method>  name of the transform method

```
 dazzle  bitmap_file_path file  new_file_name file transform_method

 ```

### Installation

This is a node js project that can be installed and run as a command line tool.  

  1. Clone or fork this repository.

  2. In terminal, navigate to the root of the project.

  3. Enter
  `npm install`

  4. Enter
  `npm link`

  5. You are now ready to use dazzle!


  ---




### Transform Methods:

  - `random`  Randomize the color palette of the image

  - `reverse`  Description of -a flag

  - `boostGreen`  Sets the green values to 255

  - `boostRed`	Sets the red values to 255

  - `boostBlue`	Sets the blue values to 255

  - `redChannel`	 Creates a gray scale image based on the value of the red value

  - `blackWhite`	Creates a gray scale image based on the average value of the rgb values

  - `invert`   Inverts the rgb values

  - `invert2`  Inverts every fourth bit in the color palette

  - `invert3`  Inverts every third bit in the color palette

  - `invert4`  Inverts every other bit in the color palette

### Example

  ```
  dazzle ~/users/home/pictures/test.bmp dazed boostGreen

  ```
#### Dazzle man page

```
man dazzle

```

---

### Reader Module

The reader module requires a file system module and contains two functions. The read and write function takes in an arity of two, the file path and callback. The read method reads the image file past in and passes the information to the bitmap module. The write method takes the transformed object representing the image and writes a new file based on the path provided in the argument.  The callback in the read file sends the file data of the original image to the bitmap module.

##### Reader Functions:

* `read` - takes the file data of the image from the file path given and the callback sends the information to the bitmap module.

* `write` - takes the file data of the new image from the bitmap module and creates a new file.

---

### Transform Module

The transform module contains functions to change the color array or pixel array in a bitmap image. All transform module functions have an arity of two, each taking in the object representing a bitmap image (created from the bitmap module) and a callback to send the transformed file data back to the reader module.

##### Transform Functions:

* `random` - takes each bit in the color array and assigns a random number (between 0 and 255) to the RGBa values. The new image file created will be different each time this function is called.

* `invert` - alters the color array to the opposite RGBa value (ex: 255 becomes 0).

* `reverse` - alters the pixel array and flips the image both vertically and horizontally.

* `boostGreen` - alters all green values in the color array to 255.

* `boostRed` - alters all red values in the color array to 255.

* `boostBlue` - alters all blue values in the color array to 255.

* `redChannel` - alters each green and blue value in the color array to equal the red value. This returns a grayscale image based on the red channel.

* `blackWhite` - alters each red green and blue value in the color array to the average of all three and returns a grayscale image.

* `invert2` - alters every 4th bit in the color array to it's opposite value.

* `invert3` - alters every 3rd bit in the color array to it's opposite value.

* `invert4` - alters every other bit in the color array to it's opposite value.



## TESTING

---

### index.test.js

  - Test that the app wil not run without arguments.

  - Test that the app does not run with less than two arguments.

  - Test that the app wil not run with out a valid transform method.


### reader.test.js

#### reader.read

  - Test that the reader function can read a file.

  - Test that the reader function will send an error message if the file does not exist.

  - Test the the reader function will send an error if the file path is missing.

#### reader.write

  - Test that the write function can create a file.

  - Test that the write function can write to a file.

  - Test that the write function can return an error message if the directory does not exist


### bitmap.test.js

  - Test that the object will return an error if the buffer is null.

  - Test that the constructor can create an object from a buffer

  - Test that the constructor will return an error message if the buffer is not from a bit map.


### transform.test.js

#### transform.random

  - Test that the object passed to the transform was created by the Bmp object constructor.

  - Test that the object has the pixelArray and colorArray properties.

  - Test that the pixelArray and colorArray properties have values.

  - Test that the colorArray no longer matches the original

#### transform.reverse

  - Test that the object passed to the transform was created by the Bmp object constructor.

  - Test that the object has the pixelArray and colorArray properties.

  - Test that the pixelArray and colorArray properties have values.

  - Test the the pixelArray is the reverse of the original

#### transform.boostGreen

  - Test that the object passed to the transform was created by the Bmp object constructor.

  - Test that the object has the pixelArray and colorArray properties.

  - Test that the pixelArray and colorArray properties have values.

  - Test that all the green values are 255

#### transform.boostRed

  - Test that the object passed to the transform was created by the Bmp object constructor.

  - Test that the object has the pixelArray and colorArray properties.

  - Test that the pixelArray and colorArray properties have values.

  - Test that all the red values are 255

#### transform.boostBlue

  - Test that the object passed to the transform was created by the Bmp object constructor.

  - Test that the object has the pixelArray and colorArray properties.

  - Test that the pixelArray and colorArray properties have values.

  - Test that all the blue values are 255

#### transform.redChannel

  - Test that the object passed to the transform was created by the Bmp object constructor.

  - Test that the object has the pixelArray and colorArray properties.

  - Test that the pixelArray and colorArray properties have values.

  - Test that all the values are equal to the red value

#### transform.blackWhite

  - Test that the object passed to the transform was created by the Bmp object constructor.

  - Test that the object has the pixelArray and colorArray properties.

  - Test that the pixelArray and colorArray properties have values.

  - Test that the values are the average of all the values

#### transform.invert

  - Test that the object passed to the transform was created by the Bmp object constructor.

  - Test that the object has the pixelArray and colorArray properties.

  - Test that the pixelArray and colorArray properties have values.

  - Test that the values of each color are the inverse of the original

#### transform.invert2

  - Test that the object passed to the transform was created by the Bmp object constructor.

  - Test that the object has the pixelArray and colorArray properties.

  - Test that the pixelArray and colorArray properties have values.

  - Test that every 4th value is the inverse of the original


#### transform.invert3

  - Test that the object passed to the transform was created by the Bmp object constructor.

  - Test that the object has the pixelArray and colorArray properties.

  - Test that the pixelArray and colorArray properties have values.

  - Test that every 3th value is the inverse of the original

#### transform.invert4

  - Test that the object passed to the transform was created by the Bmp object constructor.

  - Test that the object has the pixelArray and colorArray properties.

  - Test that the pixelArray and colorArray properties have values.

  - Test that every other value is the inverse of the original
