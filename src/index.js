// tracespace viewer

import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createApp, h} from 'deku'
import createLogger from 'redux-logger'
import throttle from 'redux-throttle'

import main from './app/component/main'
import appReducer, {NAME as APP_NAME} from './app/reducer'
import layerReducer, {NAME as LAYER_NAME} from './layer/reducer'
import converter from './converter'

const reducer = combineReducers({
  [APP_NAME]: appReducer,
  [LAYER_NAME]: layerReducer
})

const worker = converter.createMiddleware()
const throttler = throttle(100, {leading: false, trailing: true})
const logger = createLogger()
const store = createStore(reducer, applyMiddleware(worker, throttler, logger))
const render = createApp(document.getElementById('mount'), store.dispatch)

let nextMain = main
let isUpdating = false
let componentToUpdate
const update = function update(component) {
  if (!isUpdating) {
    isUpdating = true
    componentToUpdate = component

    requestAnimationFrame(() => {
      isUpdating = false
      render(h(componentToUpdate), store.getState())
    })
  }
}

store.subscribe(() => update(nextMain))

update(nextMain)

if (module.hot) {
  module.hot.accept('./app/component/main', () => {
    nextMain = require('./app/component/main').default

    update(nextMain)
  })
}
