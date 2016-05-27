// layer components

import {element} from 'deku'
import render from 'gerber-to-svg/lib/_render'

export const layer = {
  render({props}) {
    const svg = renderLayer(props.render, props.id)

    return element('li', {innerHTML: svg})
  }
}

export const stackedLayers = {
  render({props}) {
    const layers = props.layers

    return element('div', {}, [
      element('ol', {}, layers.map((layerModel, index) => {
        return element(layer, Object.assign({}, layerModel, {key: index}))
      }))
    ])
  }
}

// export const layerNameList = {
//   render({props}) {
//     const layers = props.layers
//
//
//   }
// }
