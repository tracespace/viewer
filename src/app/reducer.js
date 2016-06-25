// app reducer

import omit from 'lodash.omit'
import {combineReducers} from 'redux'

import * as layerActionType from '../layer/action'
import * as appActionType from './action'

export const NAME = 'app'

const INITIAL_STATE = {view: 'layers', layers: {}}

const view = function(state = INITIAL_STATE.view, action) {
  switch (action.type) {
    case appActionType.SWITCH_VIEW:
      return action.view

    default:
      return state
  }
}

const layers = function(state = INITIAL_STATE.layers, action) {
  switch (action.type) {
    case layerActionType.ADD:
      return Object.assign({}, state, {
        [action.id]: {showSettings: false}
      })

    case layerActionType.REMOVE:
      return omit(state, action.id)

    case appActionType.TOGGLE_LAYER_SETTINGS:
      return Object.assign({}, state, {
        [action.id]: {showSettings: !state[action.id].showSettings}
      })

    default:
      return state
  }
}

export default combineReducers({view, layers})
