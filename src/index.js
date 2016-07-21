// tracespace viewer
'use strict'

const {createStore, combineReducers, applyMiddleware} = require('redux')
const {createApp, h} = require('deku')
const createLogger = require('redux-logger')
const throttle = require('redux-throttle')
const raf = require('raf')

const main = require('./app/component/main')
const appReducer = require('./app/reducer')
const layerReducer = require('./layer/reducer')
const layerMiddleware = require('./layer/middleware')
const converter = require('./converter')

const reducer = combineReducers({
  [appReducer.NAME]: appReducer,
  [layerReducer.NAME]: layerReducer
})

const middleware = applyMiddleware(
  layerMiddleware.uniqueId(),
  layerMiddleware.randomColor(),
  converter.createMiddleware(),
  throttle.default(100, {leading: false, trailing: true}),
  createLogger())

const store = createStore(reducer, middleware)
const render = createApp(document.getElementById('mount'), store.dispatch)

let nextMain = main
let isUpdating = false
let componentToUpdate
const update = function update(component) {
  if (!isUpdating) {
    isUpdating = true
    componentToUpdate = component

    raf(() => {
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
