// selectors for the app
'use strict'

const {createSelector} = require('reselect')

const {NAME} = require('./reducer')

const getPanZoom = (state) => state[NAME].panZoom
const getLayerDisplayStates = (state) => state[NAME].layers
const getSelectedView = (state) => state[NAME].view
const getAboutIsOpen = (state) => state[NAME].aboutIsOpen

const getSelectedPanZoom = createSelector(
  getSelectedView,
  getPanZoom,
  (view, panZoom) => panZoom[view])

module.exports = {
  getLayerDisplayStates,
  getSelectedView,
  getSelectedPanZoom,
  getAboutIsOpen
}
