// layer reducers

import omit from 'lodash.omit'
import without from 'lodash.without'

import {ADD, FINISH_RENDER, SET_VISIBILITY, REMOVE} from './action'

const render = function renderLayerReducer(isRendered, state, action) {
  const id = action.id
  const layer = Object.assign(
    {isVisible: true},
    state[id],
    {isRendered},
    omit(action, 'type', 'meta'))

  return Object.assign({}, state, {[id]: layer})
}

const setVisibility = function setLayerVisibilityReducer(state, action) {
  const id = action.id
  const layer = Object.assign({}, state[id], omit(action, 'type'))

  return Object.assign({}, state, {[id]: layer})
}

const removeRender = function removeLayerReducer(state, action) {
  const id = action.id

  return omit(state, id)
}

export const layersById = function layersByIdReducer(state = {}, action) {
  switch (action.type) {
    case ADD:
    case FINISH_RENDER:
      return render((action.type === FINISH_RENDER), state, action)

    case SET_VISIBILITY:
      return setVisibility(state, action)

    case REMOVE:
      return removeRender(state, action)

    default:
      return state
  }
}

export const layers = function layersReducer(state = [], action) {
  switch (action.type) {
    case ADD:
      if (state.indexOf(action.id) !== -1) {
        return state
      }

      return state.concat(action.id)

    case REMOVE:
      return without(state, action.id)

    default:
      return state
  }
}
