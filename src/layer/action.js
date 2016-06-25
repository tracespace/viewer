// layer actions

import shortId from 'shortid'
import randomColor from 'randomColor'

export const ADD = 'layer:ADD'
export const START_RENDER = 'layer:START_RENDER'
export const FINISH_RENDER = 'layer:END_RENDER'
export const TOGGLE_VISIBILITY = 'layer:TOGGLE_VISIBILITY'
export const SET_CONVERSION_OPTS = 'layer:SET_CONVERSION_OPTS'
export const SET_TYPE = 'layer:SET_TYPE'
export const SET_COLOR = 'layer:SET_COLOR'
export const REMOVE = 'layer:REMOVE'

export const add = function(file) {
  const id = shortId.generate()
  const color = randomColor({luminosity: 'dark'})
  const meta = {convert: true}

  return {type: ADD, id, file, color, meta}
}

export const startRender = function(id, layerType) {
  return {type: START_RENDER, id, layerType}
}

export const finishRender = function(id, conversionOpts, render, error) {
  return {type: FINISH_RENDER, id, conversionOpts, render, error}
}

export const toggleVisibility = function(id) {
  return {type: TOGGLE_VISIBILITY, id}
}

export const setConversionOpts = function(id, conversionOpts) {
  const meta = {convert: true}

  return {type: SET_CONVERSION_OPTS, id, conversionOpts, meta}
}

export const setType = function(id, layerType) {
  return {type: SET_TYPE, id, layerType}
}

export const setColor = function(id, color) {
  return {type: SET_COLOR, id, color}
}

export const remove = function(id) {
  return {type: REMOVE, id}
}
