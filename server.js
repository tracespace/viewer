const webpack = require('webpack')
const dev = require('webpack-dev-middleware')
const hot = require('webpack-hot-middleware')
const express = require('express')

const config = require('./webpack.config.js')

const HOST = process.env.DEV_HOST || 'localhost'
const PORT = process.env.DEV_PORT || 8080

const compiler = webpack(config)
const app = express()

app.use(dev(compiler, {publicPath: config.output.publicPath}))
app.use(hot(compiler, {reload: true}))
app.use(express.static(config.output.path))

app.listen(PORT, HOST, (error) => {
  if (error) {
    throw error
  }

  process.stdout.write(`Server listening at http://${HOST}:${PORT}\n`)
})
