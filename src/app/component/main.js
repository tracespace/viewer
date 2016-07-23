// main viewer component
'use strict'

const {h} = require('deku')
const set = require('lodash.set')

const Nav = require('./nav')
const GerberInput = require('./gerber-input')
const GerberOutput = require('./gerber-output')
const ViewSelect = require('./view-select')
const View = require('./view')

const appAction = require('../action')
const {
  getSelectedView,
  getSelectedPanZoom,
  getLayerDisplayStates
} = require('../selector')

const layerAction = require('../../layer/action')
const {
  getLayers,
  getRenderedLayers,
  getRenders,
  getUnits,
  getTotalViewbox
} = require('../../layer/selector')

const addGerber = (dispatch) => (event) => {
  const files = Array.from(event.target.files)

  files.forEach((file) => dispatch(layerAction.add(file)))
}

const switchView = (dispatch) => (view) => (event) => {
  event.preventDefault()
  event.stopPropagation()

  dispatch(appAction.switchView(view))
}

const toggleVisibility = (dispatch) => (id) => () => {
  dispatch(layerAction.toggleVisibility(id))
}

const setType = (dispatch) => (id) => (event) => {
  dispatch(layerAction.setType(id, event.target.value))
}

const setConversionOpts = (dispatch) => (id, conversionOpts, path) => (value) => {
  const opts = Object.assign({}, conversionOpts)

  dispatch(layerAction.setConversionOpts(id, set(opts, path, value)))
}

const setColor = (dispatch) => (id) => (event) => {
  dispatch(layerAction.setColor(id, event.target.value))
}

const removeGerber = (dispatch) => (id) => () => {
  dispatch(layerAction.remove(id))
}

const toggleLayerSettings = (dispatch) => (id) => () => {
  dispatch(appAction.toggleLayerSettings(id))
}

const handleFit = (dispatch) => (view) => () => {
  dispatch(appAction.fitView(view))
}

const handleZoom = (dispatch) => (view) => (event) => {
  event.stopPropagation()
  event.preventDefault()

  // clamp zoom at 10%
  const zoomDir = -Math.sign(event.deltaY)
  const zoomMag = Math.min(Math.abs(0.005 * event.deltaY), 0.25)

  const zoom = zoomDir * zoomMag
  const zoomX = event.clientX / event.currentTarget.clientWidth
  const zoomY = event.clientY / event.currentTarget.clientHeight

  dispatch(appAction.zoomView(view, zoom, zoomX, zoomY))
}

const handlePan = (dispatch) => (view) => (event) => {
  const panX = event.clientX / event.currentTarget.clientWidth
  const panY = event.clientY / event.currentTarget.clientHeight

  dispatch(appAction.panView(view, panX, panY))
}

const handleStartPan = (dispatch) => (view) => (event) => {
  const startX = event.clientX / event.currentTarget.clientWidth
  const startY = event.clientY / event.currentTarget.clientHeight

  dispatch(appAction.startPan(view, startX, startY))
}

const handleEndPan = (dispatch) => (view) => () => {
  dispatch(appAction.endPan(view))
}

const handleDiscretePan = (dispatch) => (view) => (direction) => {
  dispatch(appAction.discretePan(view, direction))
}

const handleZoomTo = (dispatch) => (view) => (zoom) => {
  dispatch(appAction.zoomTo(view, zoom))
}

// const handleDiscreteZoom = (dispatch) => (view, direction) => () => {
//   dispatch(appAction.discreteZoom(view, direction))
// }

module.exports = function renderMain({dispatch, context}) {
  const layers = getLayers(context)
  const renders = getRenders(context)
  const units = getUnits(context)
  const renderedLayers = getRenderedLayers(context)
  const layerDisplayStates = getLayerDisplayStates(context)
  const selectedView = getSelectedView(context)
  const selectedPanZoom = getSelectedPanZoom(context)
  const totalViewbox = getTotalViewbox(context)
  const windowAspect = context.browser.width / context.browser.height

  return h('div', {class: 'h-100 '}, [
    h(Nav, {}),

    h('div', {class: 'w-25 mh3 mt3-past-h3 fixed right-0 app-ht z-1 click-thru'}, [
      h(ViewSelect, {view: selectedView, switchView: switchView(dispatch)}),
      h(GerberOutput, {
        layers,
        renders,
        units,
        layerDisplayStates,
        toggleVisibility: toggleVisibility(dispatch),
        remove: removeGerber(dispatch),
        setType: setType(dispatch),
        setConversionOpts: setConversionOpts(dispatch),
        setColor: setColor(dispatch),
        toggleSettings: toggleLayerSettings(dispatch)
      }),
      h(GerberInput, {addGerber: addGerber(dispatch)})
    ]),

    h('div', {class: 'relative w-100 h-100 overflow-hidden bg-black-10'}, [
      h(View, {
        view: selectedView,
        panZoom: selectedPanZoom,
        layers: renderedLayers,
        handleFit: handleFit(dispatch),
        handleZoom: handleZoom(dispatch),
        handlePan: handlePan(dispatch),
        handleStartPan: handleStartPan(dispatch),
        handleEndPan: handleEndPan(dispatch),
        handleDiscretePan: handleDiscretePan(dispatch),
        handleZoomTo: handleZoomTo(dispatch),
        totalViewbox,
        windowAspect
      })
    ])
  ])
}
