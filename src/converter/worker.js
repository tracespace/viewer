// gerber converter webworker

import {element} from 'deku'
import omit from 'lodash.omit'
import gerberToSvg, {clone} from 'gerber-to-svg'
import whatsThatGerber from 'whats-that-gerber'
import fileReader from 'filereader-stream'
import {PassThrough, Writable} from 'readable-stream'

import {ADD, SET_CONVERSION_OPTS, startRender, finishRender} from '../layer/action'

const gerberCache = {}

const gerberToSvgOptions = function(id, baseOptions) {
  return Object.assign({}, baseOptions, {
    id,
    createElement: element,
    includeNamespace: false,
    objectMode: true
  })
}

const dispatch = function(action) {
  self.postMessage(JSON.stringify(action))
}

const addLayer = function(action) {
  const {id, meta, file} = action
  const gerberFile = fileReader(file, {chunkSize: 2048})
  const layerType = whatsThatGerber(file.name)
  const conversionOpts = {plotAsOutline: layerType === 'out'}

  const startLayerRender = Object.assign(
    startRender(id, layerType),
    {meta})

  dispatch(startLayerRender)

  const teeStream = new PassThrough()
  const cacheGerberFile = new Writable({
    write: function(chunk, encoding, done) {
      gerberCache[id] += chunk
      done()
    }
  })

  gerberCache[id] = ''
  teeStream.pipe(cacheGerberFile)

  const options = gerberToSvgOptions(id, conversionOpts)
  const render = gerberToSvg(gerberFile.pipe(teeStream), options, function(error) {
    Object.assign(conversionOpts, render.parser.format, render.plotter.format)

    const finishLayerRender = Object.assign(
      finishRender(id, conversionOpts, clone(render), error),
      {meta})

    dispatch(finishLayerRender)
  })
}

const reRenderLayer = function(action) {
  const {id, conversionOpts, meta} = action
  const gerberFile = gerberCache[id]

  const startLayerRender = Object.assign(
    startRender(id),
    {meta})

  dispatch(startLayerRender)

  const options = gerberToSvgOptions(id, conversionOpts)
  const render = gerberToSvg(gerberFile, options, function(error) {
    const finishLayerRender = Object.assign(
      finishRender(id, conversionOpts, (render), error),
      {meta})

    dispatch(finishLayerRender)
  })
}

self.addEventListener('message', (message) => {
  const action = message.data

  switch (action.type) {
    case ADD:
      return addLayer(action)

    case SET_CONVERSION_OPTS:
      return reRenderLayer(action)
  }
})
