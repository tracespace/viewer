// app actions
'use strict'

const action = module.exports = {
  SWITCH_VIEW: 'app:SWITCH_VIEW',
  FIT_VIEW: 'app:FIT_VIEW',
  ZOOM_VIEW: 'app:ZOOM_VIEW',
  PAN_VIEW: 'app:PAN_VIEW',
  START_PAN: 'app:START_PAN',
  END_PAN: 'app:END_PAN',
  DISCRETE_PAN: 'app:DISCRETE_PAN',
  ZOOM_TO: 'app:ZOOM_TO',
  TOGGLE_LAYER_SETTINGS: 'app:TOGGLE_LAYER_SETTINGS',
  OPEN_ABOUT: 'app:OPEN_ABOUT',

  switchView(view) {
    return {type: action.SWITCH_VIEW, view}
  },

  fitView(view) {
    return {type: action.FIT_VIEW, view}
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

  discretePan(view, direction) {
    return {type: action.DISCRETE_PAN, view, direction}
  },

  zoomTo(view, zoom) {
    return {type: action.ZOOM_TO, view, zoom, meta: {throttle: true}}
  },

  toggleLayerSettings(id) {
    return {type: action.TOGGLE_LAYER_SETTINGS, id}
  },

  openAbout(open) {
    return {type: action.OPEN_ABOUT, open}
  }
}
