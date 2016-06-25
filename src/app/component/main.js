// main viewer component

import {h} from 'deku'
import set from 'lodash.set'

import {TopNav} from './nav'
import {GerberInput} from './gerber-input'
import {GerberOutput} from './gerber-output'
import {ViewSelect} from './view-select'
import {View} from './view'

import * as appAction from '../action'
import {getSelectedView, getLayerDisplayStates} from '../selector'

import * as layerAction from '../../layer/action'
import {getLayers, getRenderedLayers} from '../../layer/selector'

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

export default {
  render({dispatch, context}) {
    const layers = getLayers(context)
    const renderedLayers = getRenderedLayers(context)
    const layerDisplayStates = getLayerDisplayStates(context)
    const selectedView = getSelectedView(context)

    return h('div', {class: 'h-100 '}, [
      h(TopNav, {}),

      h('div', {class: 'w-25 app-ht mh3 fixed right-0 max-app-ht h-100 z-1'}, [
        h(ViewSelect, {view: selectedView, switchView: switchView(dispatch)}),
        h(GerberOutput, {
          layers,
          renderedLayers,
          layerDisplayStates,
          toggleVisibility: toggleVisibility(dispatch),
          remove: removeGerber(dispatch),
          setType: setType(dispatch),
          setConversionOpts: setConversionOpts(dispatch),
          toggleSettings: toggleLayerSettings(dispatch)
        }),
        h(GerberInput, {addGerber: addGerber(dispatch)})
      ]),

      h('div', {class: 'absolute absolute--fill overflow-hidden z-back bg-light-gray'}, [
        h(View, {view: selectedView, layers: renderedLayers})
      ])
    ])
  }
}
