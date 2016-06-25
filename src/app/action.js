// app actions

export const TOGGLE_LAYER_SETTINGS = 'app:TOGGLE_LAYER_SETTINGS'

export const toggleLayerSettings = function(id) {
  return {type: TOGGLE_LAYER_SETTINGS, id}
}
