// tracespace viewer

import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createApp, element} from 'deku'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import app from './app'
import layer from './layer'
import converter from './converter'

const reducer = combineReducers({
  [layer.NAME]: combineReducers(layer.reducer)
})

const worker = converter.createMiddleware()
const logger = createLogger()
const store = createStore(reducer, applyMiddleware(worker, thunk, logger))
const render = createApp(document.getElementById('mount'), store.dispatch)

let main = app.main

const update = function update() {
  render(element(main), store.getState())
}

store.subscribe(update)

update()

if (module.hot) {
  module.hot.accept('./app', () => {
    main = require('./app').default.main
    update()
  })
}
