// main viewer component

import {h} from 'deku'
import set from 'lodash.set'

import {TopNav} from './nav'
import {GerberInput} from './gerber-input'
import {GerberOutput} from './gerber-output'
import {ViewSelect} from './view-select'
import {View} from './view'

import * as appAction from '../action'
import {getSelectedView, getSelectedPanZoom, getLayerDisplayStates} from '../selector'

import * as layerAction from '../../layer/action'
import {
  getLayers,
  getRenderedLayers,
  getRenders,
  getUnits,
  getTotalViewbox
} from '../../layer/selector'

const addGerber = (dispatch) => (event) => {
  const files = Array.from(event.target.files)

  files.forEach((file) => dispatch(layerAction.add(file)))
}

const switchView = (dispatch) => (view) => () => {
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

const removeGerber = (dispatch) => (id) => () => {
  dispatch(layerAction.remove(id))
}

const toggleLayerSettings = (dispatch) => (id) => () => {
  dispatch(appAction.toggleLayerSettings(id))
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

export default {
  render({dispatch, context}) {
    const layers = getLayers(context)
    const renders = getRenders(context)
    const units = getUnits(context)
    const renderedLayers = getRenderedLayers(context)
    const layerDisplayStates = getLayerDisplayStates(context)
    const selectedView = getSelectedView(context)
    const selectedPanZoom = getSelectedPanZoom(context)
    const totalViewbox = getTotalViewbox(context)

    return h('div', {class: 'h-100 '}, [
      h(TopNav, {}),

      h('div', {class: 'w-25 mh3 mt5 pt3 fixed right-0 max-app-ht z-1'}, [
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
          toggleSettings: toggleLayerSettings(dispatch)
        }),
        h(GerberInput, {addGerber: addGerber(dispatch)})
      ]),

      h('div', {class: 'relative w-100 h-100 overflow-hidden bg-light-gray'}, [
        h(View, {
          view: selectedView,
          panZoom: selectedPanZoom,
          layers: renderedLayers,
          handleZoom: handleZoom(dispatch),
          handlePan: handlePan(dispatch),
          handleStartPan: handleStartPan(dispatch),
          handleEndPan: handleEndPan(dispatch),
          totalViewbox
        })
      ])
    ])
  }
}
