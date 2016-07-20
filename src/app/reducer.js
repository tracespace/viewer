// app reducer
'use strict'

const omit = require('lodash.omit')
const {combineReducers} = require('redux')

const layerActionType = require('../layer/action')
const appActionType = require('./action')

const NAME = 'app'

const INITIAL_STATE = {
  view: 'layers',
  panZoom: {
    layers: {
      panStart: null,
      scale: 0.6,
      x: 0.4,
      y: 0.5
    },
    board: {
      panStart: null,
      scale: 0.6,
      x: 0.4,
      y: 0.5
    }
  },
  layers: {}
}

const handleZoom = (state, action) => {
  const {view, zoom, zoomX, zoomY} = action
  let scale = state[view].scale * (1 + zoom)

  // impose upper and lower bounds on scale
  scale = Math.max(scale, 0.1)
  scale = Math.min(scale, 50)

  const offsetX = state[view].x - zoomX
  const offsetY = state[view].y - zoomY
  const scaleFactor = scale / state[view].scale
  const x = zoomX + scaleFactor * offsetX
  const y = zoomY + scaleFactor * offsetY
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
        x: x + panX - state[view].panStart[0],
        y: y + panY - state[view].panStart[1],
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

  return Object.assign({}, state, {[action.view]: viewPanZoom})
}

const view = function(state = INITIAL_STATE.view, action) {
  switch (action.type) {
    case appActionType.SWITCH_VIEW:
      return action.view

    default:
      return state
  }
}

const panZoom = function(state = INITIAL_STATE.panZoom, action) {
  switch (action.type) {
    case appActionType.ZOOM_VIEW:
      return handleZoom(state, action)

    case appActionType.PAN_VIEW:
      return handlePan(state, action)

    case appActionType.START_PAN:
      return handleStartPan(state, action)

    case appActionType.END_PAN:
      return handleEndPan(state, action)

    default:
      return state
  }
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

    default:
      return state
  }
}

module.exports = combineReducers({view, panZoom, layers})
module.exports.NAME = NAME
