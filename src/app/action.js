// app actions

export const SWITCH_VIEW = 'app:SWITCH_VIEW'
export const TOGGLE_LAYER_SETTINGS = 'app:TOGGLE_LAYER_SETTINGS'

export const switchView = function(view) {
  return {type: SWITCH_VIEW, view}
}

export const toggleLayerSettings = function(id) {
  return {type: TOGGLE_LAYER_SETTINGS, id}
}
