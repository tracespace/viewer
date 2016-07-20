// gerber converter worker module
'use strict'

const middleware = require('./middleware')
const ConverterWorker = require('./worker')

const NAME = 'converter'

module.exports = {
  NAME,

  createMiddleware: function createWorkerMiddleware() {
    const worker = new ConverterWorker()
    const middle = middleware(worker)

    return middle
  }
}
