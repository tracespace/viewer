// selectors for the app

import {createSelector} from 'reselect'

import {NAME} from './reducer'

export const getLayerDisplayStates = (state) => state[NAME].layers
export const getSelectedView = (state) => state[NAME].view

const getPanZoom = (state) => state[NAME].panZoom

export const getSelectedPanZoom = createSelector(
  getSelectedView,
  getPanZoom,
  (view, panZoom) => panZoom[view])
