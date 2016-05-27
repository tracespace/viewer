'use strict'

const path = require('path')
const webpack = require('webpack')
const dev = require('webpack-dev-middleware')
const hot = require('webpack-hot-middleware')
const express = require('express')

const config = require('./webpack.config.js')

const compiler = webpack(config)
const app = express()

app.use(dev(compiler, {publicPath: config.output.publicPath}))
app.use(hot(compiler))

app.get('/test.gif', (request, response) => {
  response.sendFile(path.join(__dirname, 'public/test.gif'))
})

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(8080, 'localhost', () => {
  process.stdout.write('Server listening at http://localhost:8080\n')
})
