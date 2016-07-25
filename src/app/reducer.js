// app reducer
'use strict'

const omit = require('lodash.omit')
const {combineReducers} = require('redux')

const layerActionType = require('../layer/action')
const appActionType = require('./action')
const {
  ZOOM_SCALE_MIN,
  ZOOM_SCALE_MAX,
  FIT_BASE_X,
  FIT_BASE_Y,
  PAN_DISCRETE_AMOUNT
} = require('./constant')

const NAME = 'app'

const INITIAL_STATE = {
  view: 'layers',
  aboutIsOpen: false,
  panZoom: {
    layers: {panStart: null, scale: 1, x: 0, y: 0},
    board: {panStart: null, scale: 1, x: 0, y: 0}
  },
  layers: {}
}

const clampZoom = (zoom, scale) => {
  const minBound = ZOOM_SCALE_MIN / scale - 1
  const maxBound =  ZOOM_SCALE_MAX / scale - 1

  zoom = Math.max(zoom, minBound)
  zoom = Math.min(zoom, maxBound)

  return zoom
}

const handleZoom = (state, action) => {
  const {view, zoom, zoomX, zoomY} = action

  // not going to show my work, but this math is correct according to my TI-89
  const {x: lastX, y: lastY, scale: lastScale} = state[view]
  const zoomFactor = clampZoom(zoom, lastScale)
  const scale = lastScale * (1 + zoomFactor)
  const x = lastX + zoomFactor * (lastX - zoomX + FIT_BASE_X)
  const y = lastY + zoomFactor * (lastY - zoomY + FIT_BASE_Y)
  const viewPanZoom = Object.assign({}, state[view], {scale, x, y})

  return Object.assign({}, state, {[action.view]: viewPanZoom})
}

const handlePan = (state, action) => {
  const {view, panX, panY} = action
  const viewState = state[view]
  const {panStart, x, y} = viewState

  if (panStart) {
    return Object.assign({}, state, {
      [view]: Object.assign(viewState, {
        x: x + panX - panStart[0],
        y: y + panY - panStart[1],
        panStart: [panX, panY]
      })
    })
  }

  return state
}

const handleStartPan = (state, action) => {
  const {view, startX, startY} = action
  const viewPanZoom = Object.assign({}, state[view], {panStart: [startX, startY]})

  return Object.assign({}, state, {[view]: viewPanZoom})
}

const handleEndPan = (state, action) => {
  const {view} = action
  const viewPanZoom = Object.assign({}, state[view], {panStart: null})

  return Object.assign({}, state, {[view]: viewPanZoom})
}

const handleDiscretePan = (state, action) => {
  const {view, direction} = action
  const viewPanZoom = Object.assign({}, state[view])

  if (direction === 'up') {
    viewPanZoom.y += PAN_DISCRETE_AMOUNT
  }
  else if (direction === 'down') {
    viewPanZoom.y -= PAN_DISCRETE_AMOUNT
  }
  else if (direction === 'left') {
    viewPanZoom.x += PAN_DISCRETE_AMOUNT
  }
  else if (direction === 'right') {
    viewPanZoom.x -= PAN_DISCRETE_AMOUNT
  }
  else {
    // else direction is a fit command
    Object.assign(viewPanZoom, {scale: 1, x: 0, y: 0})
  }

  return Object.assign({}, state, {[view]: viewPanZoom})
}

const handleZoomTo = (state, action) => {
  const {view, zoom} = action
  const viewPanZoom = Object.assign({}, state[view], {scale: zoom})

  return Object.assign({}, state, {[view]: viewPanZoom})
}

const view = function(state = INITIAL_STATE.view, action) {
  switch (action.type) {
    case appActionType.SWITCH_VIEW:
      return action.view
  }

  return state
}

const aboutIsOpen = function(state = INITIAL_STATE.aboutIsOpen, action) {
  switch (action.type) {
    case appActionType.OPEN_ABOUT:
      return action.open
  }

  return state
}

const panZoom = function(state = INITIAL_STATE.panZoom, action) {
  switch (action.type) {
    case appActionType.FIT_VIEW:
    case appActionType.DISCRETE_PAN:
      return handleDiscretePan(state, action)

    case appActionType.ZOOM_VIEW:
      return handleZoom(state, action)

    case appActionType.PAN_VIEW:
      return handlePan(state, action)

    case appActionType.START_PAN:
      return handleStartPan(state, action)

    case appActionType.END_PAN:
      return handleEndPan(state, action)

    case appActionType.ZOOM_TO:
      return handleZoomTo(state, action)
  }

  return state
}

const layers = function(state = INITIAL_STATE.layers, action) {
  switch (action.type) {
    case layerActionType.ADD:
      return Object.assign({}, state, {
        [action.id]: {showSettings: false}
      })

    case layerActionType.REMOVE:
      return omit(state, action.id)

    case appActionType.TOGGLE_LAYER_SETTINGS:
      return Object.assign({}, state, {
        [action.id]: {showSettings: !state[action.id].showSettings}
      })
  }

  return state
}

module.exports = combineReducers({view, aboutIsOpen, panZoom, layers})
module.exports.NAME = NAME
