// main board / layer view
'use strict'

const {h} = require('deku')

const PanZoomControls = require('./pan-zoom-controls')
const {Layers} = require('../../layer/component')
const {Board} = require('../../board/component')
const {FIT_BASE_X, FIT_BASE_Y, FIT_BASE_SCALE} = require('../constant')

module.exports = function renderAppView({props}) {
  const {
    view,
    panZoom,
    layers,
    board,
    totalViewbox,
    windowAspect,
    handleFit,
    handleZoom,
    handlePan,
    handleStartPan,
    handleEndPan,
    handleDiscretePan,
    handleZoomTo
  } = props

  const isLayersView = view === 'layers'

  const renderView = isLayersView
    ? Layers
    : Board

  const aspect = isLayersView
    ? totalViewbox[2] / totalViewbox[3]
    : totalViewbox[2] * 2.05 / totalViewbox[3]

  // change the base scale depending on if view is width or height limited
  const baseScale = windowAspect < aspect
    ? FIT_BASE_SCALE
    : FIT_BASE_SCALE * aspect / windowAspect

  const {x, y, scale} = panZoom
  const left = `${(FIT_BASE_X + x - 0.5) * 100}%`
  const top = `${(FIT_BASE_Y + y - 0.5) * 100}%`
  const scaledWidth = baseScale * scale
  const style = `transform: translate(${left}, ${top}) scale(${scaledWidth})`
  const attributes = {
    class: 'w-100 h-100 grab relative',
    onWheel: handleZoom(view),
    onMouseDown: handleStartPan(view)
  }

  if (panZoom.panStart) {
    const endPan = handleEndPan(view)

    attributes.onMouseMove = handlePan(view)
    attributes.onMouseUp = endPan,
    attributes.onMouseLeave = endPan
  }

  return h('div', {class: 'w-100 h-100'}, [
    h(PanZoomControls, {
      panZoom,
      handleFit: handleFit(view, totalViewbox),
      handleDiscretePan: handleDiscretePan(view),
      handleZoomTo: handleZoomTo(view)
    }),
    h('div', attributes, [
      h('div', {style, class: 'w-100 h-100'}, [
        h('div', {class: 'absolute w-100 left-50 top-50 transform-center'}, [
          h(renderView, {layers, totalViewbox, board})
        ])
      ])
    ])
  ])
}
