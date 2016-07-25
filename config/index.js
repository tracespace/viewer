// build configs
'use strict'

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')

// postcss plugins
const postcssImport = require('postcss-import')
const cssnext = require('postcss-cssnext')

const resolve = (file) => path.resolve(__dirname, file)

const ENTRY = resolve('../src/index.js')
const OUT = resolve('../public')
const JS_OUT = 'bundle.js'
const CSS_OUT = 'bundle.css'

const PROD_PLUGIN_OPTS = {
  'process.env': {NODE_ENV: JSON.stringify('production')}
}

const BASE_CONFIG = {
  devtool: '#source-map',
  entry: [ENTRY],
  output: {
    path: OUT,
    filename: JS_OUT,
    library: 'app',
    publicPath: '/'
  },
  postcss: (wpContext) => [
    postcssImport({addDependencyTo: wpContext}),
    cssnext
  ],
  module: {}
}

module.exports = {
  create(plugins = [], loaders = []) {
    const config = Object.assign({}, BASE_CONFIG)

    config.plugins = plugins.map((factory) => factory())
    config.module.loaders = loaders

    return config
  },

  plugin: {
    prodEnv: () => new webpack.DefinePlugin(PROD_PLUGIN_OPTS),
    occurence: () => new webpack.optimize.OccurrenceOrderPlugin(),
    dedupe: () => new webpack.optimize.DedupePlugin(),
    uglifyJs: () => new webpack.optimize.UglifyJsPlugin(),
    extractCss: () => new ExtractTextPlugin(CSS_OUT),
    visualizeBundle: () => new Visualizer(),
    hmr: () => new webpack.HotModuleReplacementPlugin(),
    noErrors: () => new webpack.NoErrorsPlugin()
  },

  loader: {
    worker: {
      test: /\worker\.js$/,
      exclude: /node_modules/,
      loader: 'worker'
    },

    babel: {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2040']
      }
    },

    css: {
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader'
    },

    cssExtracted: {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
    },

    markdown: {
      test: /\.md$/,
      loader: 'html!markdown'
    }
  }
}
