// gerber converter webworker

import {element} from 'deku'
import omit from 'lodash.omit'
import gerberToSvg, {clone} from 'gerber-to-svg'
import whatsThatGerber from 'whats-that-gerber'
import fileReader from 'filereader-stream'
import {PassThrough, Writable} from 'readable-stream'

import {ADD, startRender, finishRender} from '../layer/action'

const gerberCache = {}

const dispatch = function(action) {
  self.postMessage(JSON.stringify(action))
}

const addLayer = function(action) {
  const meta = action.meta
  const file = fileReader(action.file, {chunkSize: 2048})
  const id = action.id
  const layerType = whatsThatGerber(file.name)
  const conversionOpts = {
    id,
    plotAsOutline: layerType === 'out'
  }

  const startLayerRender = Object.assign(
    startRender(id, layerType, conversionOpts),
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

  const gerberToSvgOptions = Object.assign(conversionOpts, {
    createElement: element,
    includeNamespace: false,
    objectMode: true
  })

  const render = gerberToSvg(file.pipe(teeStream), gerberToSvgOptions, function(error) {
    const finishLayerRender = Object.assign(
      finishRender(id, clone(render), error),
      {meta})

    dispatch(finishLayerRender)
  })
}

self.addEventListener('message', (message) => {
  const action = message.data

  switch (action.type) {
    case ADD:
      return addLayer(action)
  }
})
