// layer reducers
'use strict'

const omit = require('lodash.omit')
const without = require('lodash.without')
const {combineReducers} = require('redux')

const actionType = require('./action')

const INITIAL_STATE = {ids: [], byId: {}}

const NAME = 'layer'

const add = (state, {id, file, color}) => {
  const filename = file.name
  const isVisible = true

  return Object.assign({}, state, {[id]: {id, filename, isVisible, color}})
}

const startRender = (state, action) => {
  const {id} = action
  const layerType = action.layerType || state[id].layerType
  const isRendering = true
  const layer = Object.assign(omit(state[id], 'render'), {isRendering, layerType})

  return Object.assign({}, state, {[id]: layer})
}

const finishRender = (state, action) => {
  const {id, conversionOpts, render} = action
  const isRendering = false
  const layer = Object.assign({}, state[id], {render, conversionOpts, isRendering})

  return Object.assign({}, state, {[id]: layer})
}

const toggleVisibility = (state, {id}) => {
  const isVisible = !state[id].isVisible
  const layer = Object.assign({}, state[id], {isVisible})

  return Object.assign({}, state, {[id]: layer})
}

const setConversionOpts = (state, {id, conversionOpts}) => {
  const layer = Object.assign({}, state[id], {conversionOpts})

  return Object.assign({}, state, {[id]: layer})
}

const setType = (state, {id, layerType}) => {
  const layer = Object.assign({}, state[id], {layerType})

  return Object.assign({}, state, {[id]: layer})
}

const setColor = (state, {id, color}) => {
  const layer = Object.assign({}, state[id], {color})

  return Object.assign({}, state, {[id]: layer})
}

const removeRender = (state, action) => {
  const id = action.id

  return omit(state, id)
}

const byId = function(state = INITIAL_STATE.byId, action) {
  switch (action.type) {
    case actionType.ADD:
      return add(state, action)

    case actionType.START_RENDER:
      return startRender(state, action)

    case actionType.FINISH_RENDER:
      return finishRender(state, action)

    case actionType.TOGGLE_VISIBILITY:
      return toggleVisibility(state, action)

    case actionType.SET_CONVERSION_OPTS:
      return setConversionOpts(state, action)

    case actionType.SET_TYPE:
      return setType(state, action)

    case actionType.SET_COLOR:
      return setColor(state, action)

    case actionType.REMOVE:
      return removeRender(state, action)

    default:
      return state
  }
}

const ids = function(state = INITIAL_STATE.ids, action) {
  switch (action.type) {
    case actionType.ADD:
      if (state.indexOf(action.id) !== -1) {
        return state
      }

      return state.concat(action.id)

    case actionType.REMOVE:
      return without(state, action.id)

    default:
      return state
  }
}

module.exports = combineReducers({ids, byId})
module.exports.NAME = NAME
