// gerber converter webworker

import {element} from 'deku'
import omit from 'lodash.omit'
import gerberToSvg, {clone} from 'gerber-to-svg'
import whatsThatGerber from 'whats-that-gerber'
import fileReader from 'filereader-stream'

import {ADD, startRender, finishRender} from '../layer/action'

const dispatch = function(action) {
  self.postMessage(JSON.stringify(action))
}

self.addEventListener('message', (message) => {
  const action = message.data

  if (action.type === ADD) {
    const meta = action.meta
    const file = fileReader(action.file, {chunkSize: 2048})
    const id = action.id
    const layerType = whatsThatGerber(file.name)
    const conversionOpts = {
      id,
      plotAsOutline: layerType === 'out',
      createElement: element,
      includeNamespace: false,
      objectMode: true
    }

    const startLayerRender = Object.assign(
      startRender(id, layerType, omit(conversionOpts, 'createElement')),
      {meta})

    dispatch(startLayerRender)

    const render = gerberToSvg(file, conversionOpts, function(error) {
      const finishLayerRender = Object.assign(
        finishRender(id, clone(render), error),
        {meta})

      dispatch(finishLayerRender)
    })
  }
})
