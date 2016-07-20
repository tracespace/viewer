// layer selectors
'use strict'

const {createSelector} = require('reselect')
const viewbox = require('viewbox')

const {NAME} = require('./reducer')

const getLayerIds = (state) => state[NAME].ids

const getScale = function(collectionUnits, targetUnits) {
  const scale = collectionUnits === 'in'
    ? (1 / 25.4)
    : 25.4

  const result = targetUnits === collectionUnits
    ? 1
    : scale

  return result
}

const getLayers = createSelector(
  getLayerIds,
  (state) => state[NAME].byId,
  (layerIds, layersById) => layerIds.map((id) => layersById[id]))

const getRenderedLayers = createSelector(
  getLayers,
  (layers) => layers.filter((layer) => layer.render))

const getRenders = createSelector(
  getRenderedLayers,
  (layers) => layers.map((layer) => Object.assign({id: layer.id}, layer.render)))

const getUnits = createSelector(
  getRenders,
  (renders) => {
    return renders.reduce((result, render) => {
      const units = render.units

      result[units] = (result[units] || 0) + 1

      if (result[units] > result.max) {
        result.max = result[units]
        result.units = units
      }

      return result
    }, {max: 0, units: ''}).units
  })

const getViewboxes = createSelector(
  getRenders,
  getUnits,
  (renders, units) => renders.map((render) => {
    const {viewBox: renderBox, units: renderUnits} = render

    return viewbox.scale(renderBox, getScale(units, renderUnits))
  }))

const getTotalViewbox = createSelector(
  getViewboxes,
  (boxes) => boxes.reduce(viewbox.add, viewbox.create()))

module.exports = {
  getLayers,
  getRenderedLayers,
  getRenders,
  getUnits,
  getViewboxes,
  getTotalViewbox
}
