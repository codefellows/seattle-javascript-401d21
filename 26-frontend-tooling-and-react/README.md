![cf](http://i.imgur.com/7v5ASc8.png) 26: Frontend Tooling and React
===

## Learning Objectives
* Students will be able to configure webpack to build a web application bundle
* Students will be able to configure babel to transpile JSX and ES6 to ES5 JavaScript
* Students will be able to create and render React components to the DOM
* Students will be able to add event listeners to React components 
* Students will be able to update React component state

## Resources
* Read [Webpack Concepts](https://webpack.js.org/concepts/)
* Skim [Webpack Configuration](https://webpack.js.org/configuration/)
* Read [React Hello World](https://facebook.github.io/react/docs/hello-world.html) 
* Read [Introducing JSX](https://facebook.github.io/react/docs/introducing-jsx.html)
* Read [Rendering Elements](https://facebook.github.io/react/docs/rendering-elements.html)

## Webpack
Webpack is a module bundler for JS applications. It compiles modern JavaScript applications into bundles that can be loaded into a browser. **All of your projects' assets should be managed by webpack**, including JSON, JS, CSS, SCSS, HTML, IMAGES, FONTS, etc.

#### Plugins 
Plugins can be added to webpack to add extra functionality. Some examples include...  
 * Creating HTML files with dynamic script and link tags
 * Creating CSS files
 * Uglifying and minifying your code
 * Creating project global vars at compile time

#### Loaders
Loaders can be added to webpack to transform the data (code/json/images/etc.) imported into a project. Loaders are configured to only apply their transformations to files that match user defined regular expressions. Loaders can be chained together to transform data. Some examples include...
* Transform ES6 files into ES5 files with Babel
* Transform SASS files into CSS files
* Transform images/fonts into base64 data embedded into your SASS/CSS

## React
React is a component based view and state management library. It's designed to be declarative, making it "painless" to create interactive UIs. React can run in browsers and natively on mobile devices.

#### Components  
React components have a render method that returns a view to be rendered to the page. React developers use JSX to make their applications more readable and have a more expressive workflow when writing React views. JSX looks like HTML, but gets transpiled to ordinary JavaScript `React.createElement()` invocations by Babel. React components can also have `state` and `lifecycle hooks`. When the state of a React component bound to a view changes, the view will automatically re-render itself, eliminating the pain of manual DOM manipulation under most circumstances. React components can implement specific methods that will get called at specific points. These are called lifecycle hooks. React components can also pass data into their children through what is called one way data binding. We say that React applications have one-way data flow, because data is only passed from the top down.
