// selectors for the app

import {NAME} from './reducer'

export const getLayerDisplayStates = (state) => state[NAME].layers
export const getSelectedView = (state) => state[NAME].view
