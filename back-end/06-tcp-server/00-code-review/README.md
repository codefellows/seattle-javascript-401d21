![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) Lab 04: Bitmap Transformer
===

## Submission Instructions
* Work in a fork of this repository
* Work in a branch on your fork
* Write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-susan`
* Open a pull request to this repository
* Submit on canvas a question and observation, how long you spent, and a link to your pull request

## Resources
* [Bitmap Specification](https://en.wikipedia.org/wiki/BMP_file_format)
* [Buffer Docs](https://nodejs.org/api/buffer.html)

## Configuration
Configure the root of your repository with the following files and directories. Thoughfully name and organize any aditional configuration or module files.
* **README.md** - contains documentation
* **.gitignore** - contains a [robust](http://gitignore.io) `.gitignore` file
* **.eslintrc** - contains the course linter configuratoin
* **.eslintignore** - contains the course linter ignore configuration
* **package.json** - contains npm package config
  * create a `lint` script for running eslint
  * create a `test` script for running tests
* **lib/** - contains module definitions
* **\_\_test\_\_/asset/** - contains bitmaps for testing
* **\_\_test\_\_/** - contains unit tests

## Feature Tasks
For this assignment you will be building a bitmap (`.bmp`) transformer CLI. It will read a bitmap in from disk, run one or more color or raster transforms and then write it out to a new file. This project will require the use of node buffers in order to manipulate binary data. Your solution should be composed of small tested modules that solve specific problems. Your modules should be thoughfuly named and well documented. The entry point to your CLI should be an index.js file in the root of your package, and all helper modules should be placed in your lib/ directory. Your bitmap transformer modules should not use any third party librarys.

#### Minimum Requirements
* The CLI should be architected using best modularization practices
* The CLI should require at least three arguments `input-file-path output-file-path transfrom-name`
* The CLI should support a minimum of three transforms
* The CLI should log useful Error messages if used incorrectly
* The CLI should log a success message on completion

## Testing
* Use BDD `describe` and `test` methods to define discriptive tests and increase readablity
* Each `test` callback should aim to test a small well defined feature of a function
* Write tests to ensure each function behaves correctly with valid and invalud inputs
* The CLI should be tested without using `child_process` or any equivilant third party librarys

##  Documentation
In your README.md describe the exported values of each module you have defined. Every function description should include it's airty (expected number of paramiters), the expected data for each paramiter (data-type and limitations), and it's behavior (for both valid and invalued use). Feel free to write any additional information in your README.md.

## Tips
You will want to define a strategy for solving the problem before you begin to code. Once you have a strategy defined, you can break it into steps that can be split into helper modules. Each helper module should solve a small specific problem. The main module should utilize the helper modules to execute your original stratagy.

###### Example Strategy
0. Gather user input (infile, outfile, and transform)
0. Read the input bitmap file using the fs module
0. Parse the bitmap's buffer into object represeting a bitmap (using a constructor)
0. Using metadata from the parsed bitmap object run a transform on the buffer directly (mutate the color or raster data)
0. Write the mutated buffer to the output file path

###### Transfrom Ideas
* Color Pallet Transforms
  * Invert
  * Randomize
  * Black and White
  * Darken or Lighten
  * Add or Mutiply a Hue
  * Add or Subtract Contrast

* Raster Data Transforms
  * Pixilate
  * Add a border
  * Add a watermark
  * Vertically or Horizontaly Filp
  * Verticaly or Horizontaly Mirror
  * Verticaly or Horizontaly Stretch
