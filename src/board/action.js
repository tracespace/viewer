// board actions
'use strict'

const action = module.exports = {
  MASK_WITH_OUTLINE: 'board:MASK_WITH_OUTLINE',
  SET_COLOR: 'board:SET_COLOR',

  maskWithOutline(mask) {
    return {type: action.MASK_WITH_OUTLINE, mask}
  },

  setColor(target, color) {
    return {type: action.SET_COLOR, target, color}
  }
}
