// gerber file output component
'use strict'

const {h} = require('deku')

const GerberSettings = require('./gerber-settings')
const {LayerDefs} = require('../../layer/component')

module.exports = function renderGerberOutput({props}) {
  const {layers, layerDisplayStates, renders, units} = props
  const {
    toggleVisibility,
    toggleSettings,
    remove,
    setType,
    setConversionOpts,
    setColor
  } = props

  const children = layers.map((layer) => {
    const id = layer.id

    return h(GerberSettings, {
      layer,
      showSettings: layerDisplayStates[id].showSettings,
      toggleVisibility: toggleVisibility(id),
      toggleSettings: toggleSettings(id),
      remove: remove(id),
      setType: setType(id),
      setConversionOpts: setConversionOpts,
      setColor: setColor(id)
    })
  })

  return h('output', {class: ''}, [
    h('ol', {
      class: 'bg-white-90 list ma0 pv2 ph0 max-app-ht overflow-scroll clickable'
    }, children),
    h('p', {class: 'bg-white-90 ma0 pa1 tc clickable'}, [`${children.length} files`]),
    h('svg', {class: 'fixed z-back'}, [
      h(LayerDefs, {renders, units})
    ])
  ])
}
