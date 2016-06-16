// main viewer component

import {h} from 'deku'

import {TopNav} from './nav'
import {GerberInput} from './gerber-input'
import {ViewSelect} from './view-select'
import {Layers, StackedLayers} from '../../layer/component'
import {add as addLayer} from '../../layer/action'
import {getVisibleLayers} from '../../layer/selector'
import board from '../../board'

const addGerber = (dispatch) => (event) => {
  const files = Array.prototype.slice.call(event.target.files)

  files.forEach((file) => dispatch(addLayer(file)))
}

const switchView = (dispatch) => (view) => () => {
  console.log(`switch app to ${view}`)
}

export default {
  render({dispatch, context}) {
    const layers = getVisibleLayers(context)

    return h('div', {class: 'bg-light-gray h-100 '}, [
      h(TopNav, {}),


      h('div', {class: 'w-20 h-75 mh3 bg-white fixed right-0'}, [
        h(ViewSelect, {switchView: switchView(dispatch)}),
        h(GerberInput, {addGerber: addGerber(dispatch)})
      ]),

      h(
        board.component.Board,
        {layers}),

      h(
        StackedLayers,
        {layers}),

      h(
        Layers,
        {layers: layers})
    ])
  }
}
