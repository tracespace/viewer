// tracespace viewer
'use strict'

const {createStore, combineReducers, applyMiddleware, compose} = require('redux')
const {createApp, h} = require('deku')
const createLogger = require('redux-logger')
const throttle = require('redux-throttle')
const {responsiveStoreEnhancer, responsiveStateReducer} = require('redux-responsive')
const raf = require('raf')

const appReducer = require('./app/reducer')
const boardReducer = require('./board/reducer')
const layerReducer = require('./layer/reducer')
const layerMiddleware = require('./layer/middleware')
const converter = require('./converter')

const reducer = combineReducers({
  browser: responsiveStateReducer,
  [appReducer.NAME]: appReducer,
  [layerReducer.NAME]: layerReducer,
  [boardReducer.NAME]: boardReducer
})

const middleware = applyMiddleware(
  layerMiddleware.uniqueId(),
  layerMiddleware.randomColor(),
  converter.createMiddleware(),
  throttle.default(100, {leading: false, trailing: true}),
  createLogger())

const store = createStore(reducer, compose(responsiveStoreEnhancer, middleware))
const render = createApp(document.getElementById('mount'), store.dispatch)

let main = require('./app/component/main')
let isUpdating = false
const update = function update() {
  if (!isUpdating) {
    isUpdating = true

    raf(() => {
      isUpdating = false
      render(h(main), store.getState())
    })
  }
}

store.subscribe(update)
update(main)

if (module.hot) {
  module.hot.accept('./app/component/main', () => {
    main = require('./app/component/main')

    update(main)
  })
}
