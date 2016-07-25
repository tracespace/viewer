// dev server with HMR
'use strict'

const webpack = require('webpack')
const dev = require('webpack-dev-middleware')
const hot = require('webpack-hot-middleware')
const express = require('express')

const HOST = process.env.DEV_HOST || 'localhost'
const PORT = process.env.DEV_PORT || 8080

const {create, plugin, loader} = require('./config')
const plugins = [plugin.hmr, plugin.noErrors, plugin.visualizeBundle]
const loaders = [loader.worker, loader.babel, loader.css, loader.markdown]
const config = create(plugins, loaders)

// load hot middleware client
config.entry.unshift('webpack-hot-middleware/client')

const compiler = webpack(config)
const app = express()

const devOptions = {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}

const hotOptions = {
  reload: true
}

app.use(dev(compiler, devOptions))
app.use(hot(compiler, hotOptions))
app.use(express.static(config.output.path))

app.listen(PORT, HOST, (error) => {
  if (error) {
    throw error
  }

  process.stdout.write(`Server listening at http://${HOST}:${PORT}\n`)
})
