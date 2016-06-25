// gerber file output component

import {h} from 'deku'

import {LayerDefs, LayerDetailsItem} from '../../layer/component'

export const GerberOutput = {
  render({props}) {
    const {layers, renderedLayers, layerDisplayStates} = props

    const children = layers.map((layer) => {
      const id = layer.id

      return h(LayerDetailsItem, {
        layer,
        showSettings: layerDisplayStates[id].showSettings,
        toggleVisibility: props.toggleVisibility(id),
        toggleSettings: props.toggleSettings(id),
        remove: props.remove(id),
        setType: props.setType(id),
        setConversionOpts: props.setConversionOpts
      })
    })

    return h('output', {class: ''}, [
      h('ol', {class: 'bg-white list ma0 pv2 ph0 max-app-ht overflow-scroll'}, children),
      h('p', {class: 'bg-white ma0 pa1 tc'}, [`${children.length} files`]),
      h('svg', {class: 'dn'}, [
        h(LayerDefs, {layers: renderedLayers})
      ])
    ])
  }
}
