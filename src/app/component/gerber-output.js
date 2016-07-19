// gerber file output component

import {h} from 'deku'

import {LayerDefs, LayerDetailsItem} from '../../layer/component'

export const GerberOutput = {
  render({props}) {
    const {layers, layerDisplayStates, renders, units} = props
    const {toggleVisibility, toggleSettings, remove, setType, setConversionOpts} = props

    const children = layers.map((layer) => {
      const id = layer.id

      return h(LayerDetailsItem, {
        layer,
        showSettings: layerDisplayStates[id].showSettings,
        toggleVisibility: toggleVisibility(id),
        toggleSettings: toggleSettings(id),
        remove: remove(id),
        setType: setType(id),
        setConversionOpts: setConversionOpts
      })
    })

    return h('output', {class: ''}, [
      h('ol', {class: 'bg-white list ma0 pv2 ph0 max-app-ht overflow-scroll'}, children),
      h('p', {class: 'bg-white ma0 pa1 tc'}, [`${children.length} files`]),
      h('svg', {class: 'fixed z-back'}, [
        h(LayerDefs, {renders, units})
      ])
    ])
  }
}
