// board reducer
'use strict'

const actionType = require('./action')

const INITIAL_STATE = {
  maskWithOutline: true,
  color: {
    fr4: '#666',
    cu: '#ccc',
    cf: '#c93',
    sm: 'rgba(0, 66, 0, 0.75)',
    ss: '#fff',
    sp: '#999',
    out: '#000'
  }
}

const handleSetColor = (state, action) => {
  const {target, color} = action
  const boardColor = Object.assign({}, state.color)

  boardColor[target] = color

  return Object.assign({}, state, {color: boardColor})
}

module.exports = function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionType.MASK_WITH_OUTLINE:
      return Object.assign({}, state, {maskWithOutline: action.mask})

    case actionType.SET_COLOR:
      return handleSetColor(state, action)
  }

  return state
}

module.exports.NAME = 'board'
