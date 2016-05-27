// layer actions

import shortId from 'shortid'

export const ADD = 'layer:ADD'
export const FINISH_RENDER = 'layer:END_RENDER'
export const SET_VISIBILITY = 'layer:SET_VISIBILITY'
export const SET_TYPE = 'layer:SET_TYPE'
export const REMOVE = 'layer:REMOVE'

export const add = function addLayer(file) {
  const id = shortId.generate()

  return {type: ADD, id, file, meta: {convert: true}}
}


export const finishRender = function finishLayerRenderAction(id, render) {
  return {type: FINISH_RENDER, id, render}
}

export const setVisibility = function setLayerVisibilityAction(id, isVisible) {
  return {type: SET_VISIBILITY, id, isVisible}
}

export const setType = function setLayerType(id, layerType) {
  return {type: SET_TYPE, layerType}
}

export const remove = function removeLayerAction(id) {
  return {type: REMOVE, id}
}
