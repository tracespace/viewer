// layer selectors

import {createSelector} from 'reselect'

import {NAME} from './reducer'

export const getLayers = createSelector(
  (state) => state[NAME].layers,
  (state) => state[NAME].layersById,
  (layers, layersById) => layers.map((id) => layersById[id]))

export const getVisibleLayers = createSelector(
  getLayers,
  (layers) => layers.filter((layer) => layer.isVisible && layer.render))
