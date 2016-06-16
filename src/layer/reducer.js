// layer reducers

import {combineReducers} from 'redux'
import omit from 'lodash.omit'
import without from 'lodash.without'

import * as actionType from './action'

const add = (state, action) => {
  const id = action.id
  const filename = action.file.name
  const isVisible = true

  return Object.assign({}, state, {[id]: {id, filename, isVisible}})
}

const startRender = (state, action) => {
  const id = action.id
  const isRendering = true
  const layerType = action.layerType
  const conversionOpts = action.conversionOpts
  const layer = Object.assign(
    omit(state[id], 'render'),
    {isRendering, layerType, conversionOpts})

  return Object.assign({}, state, {[id]: layer})
}

const finishRender = (state, action) => {
  const id = action.id
  const render = action.render
  const isRendering = false
  const layer = Object.assign({}, state[id], {render, isRendering})

  return Object.assign({}, state, {[id]: layer})
}

const setAttribute = (state, action) => {
  const id = action.id
  const layer = Object.assign({}, state[id], omit(action, ['id', 'type', 'meta']))

  return Object.assign({}, state, {[id]: layer})
}

const removeRender = (state, action) => {
  const id = action.id

  return omit(state, id)
}

const layersById = function(state = {}, action) {
  switch (action.type) {
    case actionType.ADD:
      return add(state, action)

    case actionType.START_RENDER:
      return startRender(state, action)

    case actionType.FINISH_RENDER:
      return finishRender(state, action)

    case actionType.SET_VISIBILITY:
    case actionType.SET_TYPE:
    case actionType.SET_CONVERSION_OPTS:
      return setAttribute(state, action)

    case actionType.REMOVE:
      return removeRender(state, action)

    default:
      return state
  }
}

const layers = function(state = [], action) {
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

export default combineReducers({layers, layersById})

export const NAME = 'layer'
