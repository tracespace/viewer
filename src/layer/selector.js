// layer selectors

import {createSelector} from 'reselect'
import viewbox from 'viewbox'

import {NAME} from './reducer'

export const getLayerIds = (state) => state[NAME].ids

const getScale = function(collectionUnits, targetUnits) {
  const scale = collectionUnits === 'in'
    ? (1 / 25.4)
    : 25.4

  const result = targetUnits === collectionUnits
    ? 1
    : scale

  return result
}

export const getLayers = createSelector(
  getLayerIds,
  (state) => state[NAME].byId,
  (layerIds, layersById) => layerIds.map((id) => layersById[id]))

export const getRenderedLayers = createSelector(
  getLayers,
  (layers) => layers.filter((layer) => layer.render))

export const getRenders = createSelector(
  getRenderedLayers,
  (layers) => layers.map((layer) => Object.assign({id: layer.id}, layer.render)))

export const getUnits = createSelector(
  getRenders,
  (renders) => {
    const unitsCount = renders.reduce((result, render) => {
      const units = render.units

      if (units === 'in') {
        result.in++
      }
      else if (units === 'mm') {
        result.mm++
      }

      return result
    }, {in: 0, mm: 0})

    const units = unitsCount.in > unitsCount.mm
      ? 'in'
      : 'mm'

    return units
  })

export const getViewboxes = createSelector(
  getRenders,
  getUnits,
  (renders, units) => renders.map((render) => {
    const {viewBox: renderBox, units: renderUnits} = render

    return viewbox.scale(renderBox, getScale(units, renderUnits))
  }))

export const getTotalViewbox = createSelector(
  getViewboxes,
  (boxes) => boxes.reduce(viewbox.add, viewbox.create()))
