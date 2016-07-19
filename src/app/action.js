// app actions

export const SWITCH_VIEW = 'app:SWITCH_VIEW'
export const ZOOM_VIEW = 'app:ZOOM_VIEW'
export const PAN_VIEW = 'app:PAN_VIEW'
export const START_PAN = 'app:START_PAN'
export const END_PAN = 'app:END_PAN'
export const TOGGLE_LAYER_SETTINGS = 'app:TOGGLE_LAYER_SETTINGS'

export const switchView = function(view) {
  return {type: SWITCH_VIEW, view}
}

export const zoomView = function(view, zoom, zoomX, zoomY) {
  return {type: ZOOM_VIEW, view, zoom, zoomX, zoomY, meta: {throttle: true}}
}

export const panView = function(view, panX, panY) {
  return {type: PAN_VIEW, view, panX, panY, meta: {throttle: true}}
}

export const startPan = function(view, startX, startY) {
  return {type: START_PAN, view, startX, startY}
}

export const endPan = function(view) {
  return {type: END_PAN, view}
}

export const toggleLayerSettings = function(id) {
  return {type: TOGGLE_LAYER_SETTINGS, id}
}
