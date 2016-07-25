'use strict'

const {create, loader, plugin} = require('./config')

const plugins = [
  plugin.prodEnv,
  plugin.occurrence,
  plugin.dedupe,
  plugin.uglifyJs,
  plugin.extractCss
]

const loaders = [loader.worker, loader.babel, loader.cssExtracted, loader.markdown]

module.exports = create(plugins, loaders)
