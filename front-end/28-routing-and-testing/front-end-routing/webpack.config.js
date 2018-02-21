'use strict';
// Vinicio - this file will be run by node, before webpack.

// Node (webpack.config.js) -> Webpack

const HTMLPlugin = require('html-webpack-plugin');
const webpackConfig = module.exports = {};

//---------------------------------------------------------
webpackConfig.entry = `${__dirname}/src/main.js`;

webpackConfig.output = {
  filename: 'bundle.[hash].js',
  path: `${__dirname}/build`,
};

//---------------------------------------------------------

webpackConfig.plugins = [
    new HTMLPlugin(),
];

//---------------------------------------------------------

webpackConfig.module = {
  rules: [ // Vinicio - which files do we want to process?
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
  ],
};
//---------------------------------------------------------
webpackConfig.devtool = 'eval-source-map';

webpackConfig.devServer = {
  historyApiFallback: true,
};