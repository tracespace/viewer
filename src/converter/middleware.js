// gerber converter worker middleware

import uniqueId from 'lodash.uniqueid'
import raf from 'raf'

export default function makeGerberConverterMiddleware(worker) {
  return () => (next) => (action) => {
    if (action.meta && action.meta.convert) {
      const id = uniqueId()
      const workerAction = Object.assign({}, action, {meta: {id}})
      const handleMessage = (message) => {
        const action = message.data

        if (action.meta.id === id) {
          worker.removeEventListener('message', handleMessage)

          return raf(() => next(action))
        }
      }

      worker.addEventListener('message', handleMessage)
      worker.postMessage(workerAction)
    }

    return next(action)
  }
}
