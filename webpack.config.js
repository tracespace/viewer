'use strict'

const webpack = require('webpack')
const path = require('path')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')

// postcss plugins
const postcssImport = require('postcss-import')
const cssnext = require('postcss-cssnext')

const FILENAME = 'bundle.js'
// const CSS_FILENAME = 'bundle.css'

module.exports = {
  devtool: '#source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: FILENAME,
    library: 'app',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    })
  ],
  module: {
    loaders: [
      {
        test: /\worker\.js$/,
        exclude: /node_modules/,
        loader: 'worker'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2040']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      }
    ]
  },
  postcss: (wpContext) => [
    postcssImport({addDependencyTo: wpContext}),
    cssnext
  ]
}
