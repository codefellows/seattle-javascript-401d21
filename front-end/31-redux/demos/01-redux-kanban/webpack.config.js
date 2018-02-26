'use strict'

require('dotenv').config({path: `${__dirname}/.dev.env`})
let production = process.env.NODE_ENV === 'production'

const HtmlPlugin = require('html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const {DefinePlugin, EnvironmentPlugin} = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let plugins = [
  new HtmlPlugin({ template: `${__dirname}/src/index.html` }),
  new ExtractTextPlugin('bundle-[hash].css'),
  new EnvironmentPlugin(['NODE_ENV']),
  new DefinePlugin({
    __DEBUG__: JSON.stringify(!production)
  }),
]

if(production) {
  plugins = plugins.concat([
    new CleanPlugin(),
    new UglifyPlugin(),
  ])
}

module.exports = {
  plugins,
  devServer: {
    historyApiFallback: true,
  },
  devtool: production ? undefined : 'source-map',
  entry: `${__dirname}/src/main.js`,
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle-[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.(woff|woff2|ttf|eot|glyph|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'font/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png|tiff)$/,
        // exclude: /\.(glyph|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 60000,
              name: 'image/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(mp3|mp4|wav|flac|ogg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'audio/[name].[ext]'
            }
          }
        ]
      },
    ]
  }
}
