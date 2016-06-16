// layer actions

import shortId from 'shortid'

export const ADD = 'layer:ADD'
export const START_RENDER = 'layer:START_RENDER'
export const FINISH_RENDER = 'layer:END_RENDER'
export const SET_VISIBILITY = 'layer:SET_VISIBILITY'
export const SET_TYPE = 'layer:SET_TYPE'
export const SET_CONVERSION_OPTS = 'layer:SET_CONVERSION_OPTS'
export const REMOVE = 'layer:REMOVE'

export const add = function(file) {
  const id = shortId.generate()
  const meta = {convert: true}

  return {type: ADD, id, file, meta}
}

export const startRender = function(id, layerType, conversionOpts) {
  return {type: START_RENDER, id, layerType, conversionOpts}
}

export const finishRender = function(id, render, error) {
  return {type: FINISH_RENDER, id, render, error}
}

export const setVisibility = function(id, isVisible) {
  return {type: SET_VISIBILITY, id, isVisible}
}

export const setType = function(id, layerType) {
  return {type: SET_TYPE, id, layerType}
}

export const setConversionOpts = function(id, conversionOpts) {
  const meta = {convert: true}

  return {type: SET_CONVERSION_OPTS, id, conversionOpts, meta}
}

export const remove = function(id) {
  return {type: REMOVE, id}
}
