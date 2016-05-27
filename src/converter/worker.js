// gerber converter webworker

import gerberToSvg, {clone} from 'gerber-to-svg'
import fileReader from 'filereader-stream'

import layer from '../layer'

self.addEventListener('message', (message) => {
  const action = message.data

  if (action.type === layer.action.ADD) {
    const id = action.meta.id
    const renderId = action.id
    const file = fileReader(action.file, {chunkSize: 2048})

    const render = gerberToSvg(file, renderId, function() {
      const result = Object.assign(
        layer.action.finishRender(renderId, clone(render)),
        {meta: {id}})

      self.postMessage(result)
    })
  }
})
