// gerber converter worker module

import middleware from './middleware'
import ConverterWorker from './worker'

const NAME = 'converter'

const createMiddleware = function createWorkerMiddleware() {
  const worker = new ConverterWorker()
  const middle = middleware(worker)

  worker.addEventListener('error', console.error)

  return middle
}

export default {NAME, createMiddleware}
