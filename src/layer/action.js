// layer actions
'use strict'

const action = module.exports = {
  ADD: 'layer:ADD',
  START_RENDER: 'layer:START_RENDER',
  FINISH_RENDER: 'layer:END_RENDER',
  TOGGLE_VISIBILITY: 'layer:TOGGLE_VISIBILITY',
  SET_CONVERSION_OPTS: 'layer:SET_CONVERSION_OPTS',
  SET_TYPE: 'layer:SET_TYPE',
  SET_COLOR: 'layer:SET_COLOR',
  REMOVE: 'layer:REMOVE',

  add(file) {
    const meta = {uniqueId: true, randomColor: true, convert: true}

    return {type: action.ADD, file, meta}
  },

  remove(id) {
    return {type: action.REMOVE, id}
  },

  startRender(id, layerType) {
    const start = {type: action.START_RENDER, id}

    if (layerType) {
      start.layerType = layerType
    }

    return start
  },

  finishRender(id, conversionOpts, render, error) {
    return {type: action.FINISH_RENDER, id, conversionOpts, render, error}
  },

  toggleVisibility(id) {
    return {type: action.TOGGLE_VISIBILITY, id}
  },

  setConversionOpts(id, conversionOpts) {
    const meta = {convert: true}

    return {type: action.SET_CONVERSION_OPTS, id, conversionOpts, meta}
  },

  setType(id, layerType) {
    return {type: action.SET_TYPE, id, layerType}
  },

  setColor(id, color) {
    return {type: action.SET_COLOR, id, color}
  }
}
