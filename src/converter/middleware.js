// gerber converter worker middleware
'use strict'

const uniqueId = require('lodash.uniqueid')
const raf = require('raf')

module.exports = function makeGerberConverterMiddleware(worker) {
  return (store) => {
    worker.addEventListener('message', ({data}) => {
      raf(() => store.dispatch(JSON.parse(data)))
    })

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
