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

  return h('output', {class: 'fx fx-d-c bg-white-90 clickable max-app-ht'}, [
    h('ol', {
      class: 'list ma0 ph0 pv2 fx-1-1 overflow-scroll'
    }, children),
    h('p', {class: 'ma0 pa1 tc fx-0-0'}, [`${children.length} files`]),
    h('svg', {class: 'clip'}, [
      h(LayerDefs, {renders, units})
    ])
  ])
}
