// layer module and selectors

import {createSelector} from 'reselect'

import * as action from './action'
import * as reducer from './reducer'
import * as component from './component'

const NAME = 'layer'

const getLayers = createSelector(
  (state) => state[NAME].layers,
  (state) => state[NAME].layersById,
  (layers, layersById) => layers.map((id) => layersById[id]))

const getVisibleLayers = createSelector(
  getLayers,
  (layers) => layers.filter((layer) => layer.isVisible && layer.isRendered))

const selector = {getLayers, getVisibleLayers}

export default {NAME, action, reducer, component, selector}
