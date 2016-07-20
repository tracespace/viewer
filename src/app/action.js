// app actions
'use strict'

const action = module.exports = {
  SWITCH_VIEW: 'app:SWITCH_VIEW',
  ZOOM_VIEW: 'app:ZOOM_VIEW',
  PAN_VIEW: 'app:PAN_VIEW',
  START_PAN: 'app:START_PAN',
  END_PAN: 'app:END_PAN',
  TOGGLE_LAYER_SETTINGS: 'app:TOGGLE_LAYER_SETTINGS',

  switchView(view) {
    return {type: action.SWITCH_VIEW, view}
  },

  zoomView(view, zoom, zoomX, zoomY) {
    return {type: action.ZOOM_VIEW, view, zoom, zoomX, zoomY, meta: {throttle: true}}
  },

  panView(view, panX, panY) {
    return {type: action.PAN_VIEW, view, panX, panY, meta: {throttle: true}}
  },

  startPan(view, startX, startY) {
    return {type: action.START_PAN, view, startX, startY}
  },

  endPan(view) {
    return {type: action.END_PAN, view}
  },

  toggleLayerSettings(id) {
    return {type: action.TOGGLE_LAYER_SETTINGS, id}
  }
}
