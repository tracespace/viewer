// main viewer component

import {element} from 'deku'
import forEach from 'lodash.foreach'

import gerberInput from './gerber-input'
import layer from '../../layer'

const addGerber = (dispatch) => (event) => {
  forEach(event.target.files, (file) => dispatch(layer.action.add(file)))
}

export default function renderMain({context, dispatch}) {
  const layers = layer.selector.getVisibleLayers(context)

  return element('div', {class: 'main'}, [
    element(
      gerberInput,
      {onChange: addGerber(dispatch)}),

    element(
      layer.component.stackedLayers,
      {layers})
  ])
}
