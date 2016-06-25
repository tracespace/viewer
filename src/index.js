// tracespace viewer

import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createApp, element} from 'deku'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import main from './app/component/main'
import appReducer, {NAME as APP_NAME} from './app/reducer'
import layerReducer, {NAME as LAYER_NAME} from './layer/reducer'
import converter from './converter'

const reducer = combineReducers({
  [APP_NAME]: appReducer,
  [LAYER_NAME]: layerReducer
})

const worker = converter.createMiddleware()
const logger = createLogger()
const store = createStore(reducer, applyMiddleware(worker, thunk, logger))
const render = createApp(document.getElementById('mount'), store.dispatch)

const update = function update(component) {
  requestAnimationFrame(() => render(element(component), store.getState()))
}

store.subscribe(() => update(main))

update(main)

if (module.hot) {
  module.hot.accept('./app/component/main', () => {
    const nextMain = require('./app/component/main').default

    update(nextMain)
  })
}
