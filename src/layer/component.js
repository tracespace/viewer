// layer components
'use strict'

const {h} = require('deku')
const classnames = require('classnames')
const renderLayer = require('gerber-to-svg/lib/render')
const wrapLayer = require('pcb-stackup-core/lib/wrap-layer')

const component = module.exports = {
  Layer({props}) {
    const layer = props.layer

    return h('use', {
      'xlink:href': `#${layer.id}`,
      fill: layer.color,
      stroke: layer.color,
      class: classnames('layer-opacity', {dn: !layer.isVisible})
    })
  },

  LayerDefs({props}) {
    const {renders, units} = props

    const switchUnitsScale = units === 'in'
      ? (1 / 25.4)
      : 25.4

    const children = renders.map((render) => {
      const defs = render.defs
      const scale = render.units === units
        ? 1
        : switchUnitsScale

      return defs.concat(wrapLayer(h, render.id, render, scale))
    }, [])

    return h('defs', {}, children)
  },

  Layers({props, path}) {
    const {layers, totalViewbox} = props
    const offset = totalViewbox.length
      ? totalViewbox
      : [0, 0, 0, 0]

    const layerChildren = layers.map((layer) => h(component.Layer, {layer}))

    const model = {
      layer: layerChildren,
      defs: [],
      viewBox: offset,
      width: '100',
      height: '100',
      units: '%'
    }

    const padding = (offset[2])
      ? `${offset[3] / offset[2] * 100}%`
      : 0

    return h('div', {
      class: 'relative w-100 h0',
      style: `padding-bottom: ${padding}`
    }, [
      renderLayer(model, {id: path, class: 'absolute'}, h, false)
    ])
  }
}
