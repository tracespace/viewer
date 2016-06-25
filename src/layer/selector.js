// layer selectors

import {createSelector} from 'reselect'

import {NAME} from './reducer'

export const getLayerIds = (state) => state[NAME].ids

export const getLayers = createSelector(
  getLayerIds,
  (state) => state[NAME].byId,
  (layerIds, layersById) => layerIds.map((id) => layersById[id]))

export const getRenderedLayers = createSelector(
  getLayers,
  (layers) => layers.filter((layer) => layer.render))
