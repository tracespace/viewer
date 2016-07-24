'use strict'

const {h} = require('deku')
const pcbStackupCore = require('pcb-stackup-core')
const shortId = require('shortid')

module.exports = {
  Board: function renderBoard({props}) {
    const {layers, board} = props

    const stackupLayers = layers.map((layer) => {
      return {
        type: layer.layerType,
        converter: layer.render,
        externalId: layer.id
      }
    })

    const stackupOptions = Object.assign({
      id: shortId(),
      createElement: h,
      includeNamespace: false
    }, board)

    const stackup = pcbStackupCore(stackupLayers, stackupOptions)

    const width = (stackup.top.width + stackup.bottom.width) / 0.95
    const height = Math.max(stackup.top.height, stackup.bottom.height)
    const ratio = height / width * 100 + '%'

    const topRatio = stackup.top.height / stackup.top.width * 100 + '%'
    const bottomRatio = stackup.bottom.height / stackup.bottom.width * 100 + '%'

    // TODO: get rid of this hack by expanding the api of pcb-stackup-core
    stackup.top.svg.attributes.class = 'w-100 h-100'
    stackup.bottom.svg.attributes.class = 'w-100 h-100'

    return h('div', {
      class: 'relative w-100 h-0',
      style: `padding-bottom: ${ratio}`
    }, [
      h('div', {
        class: 'absolute w-47-5 top-0 left-0 h-0',
        style: `padding-bottom: ${topRatio}`
      }, [stackup.top.svg]),
      h('div', {
        class: 'absolute w-47-5 top-0 right-0 h-0',
        style: `padding-bottom: ${bottomRatio}`
      }, [stackup.bottom.svg])
    ])
  }
}
