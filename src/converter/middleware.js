// gerber converter worker middleware

import uniqueId from 'lodash.uniqueid'
import raf from 'raf'

export default function makeGerberConverterMiddleware(worker) {
  return (store) => {
    worker.addEventListener('message', ({data}) => {
      raf(() => store.dispatch(JSON.parse(data)))
    })

    worker.postMessage({})

    return (next) => (action) => {
      if (action.meta && action.meta.convert) {
        const id = uniqueId()
        const workerAction = Object.assign({}, action, {meta: {id}})

        worker.postMessage(workerAction)
      }

      return next(action)
    }
  }
}
