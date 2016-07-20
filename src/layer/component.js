// layer components
'use strict'

const {h} = require('deku')
const classnames = require('classnames')
const {getAllTypes, getFullName} = require('whats-that-gerber')
const renderLayer = require('gerber-to-svg/lib/render')
const wrapLayer = require('pcb-stackup-core/lib/wrap-layer')

const ALL_LAYER_TYPES = getAllTypes()
const ALL_LAYER_NAMES = ALL_LAYER_TYPES.map((type) => getFullName(type))

const Select = {
  render({props, path}) {
    const {name, value, options, contents, onChange} = props

    const optionElements = options.map((option, index) => {
      return h('option', {
        value: option,
        selected: option === value
      }, contents.slice(index, index + 1))
    })

    return h('div', {class: 'ph2 striped--brand-light'}, [
      h('label', {for: path, class: 'fw9 pointer'}, [
        name,
        h('span', {class: 'fa fa-angle-right mh1'})
      ]),
      h('select', {
        id: path,
        class: 'input-reset pointer bn bg-transparent',
        onChange
      }, optionElements)
    ])
  }
}

const PlacesSelect = {
  render({props}) {
    const {onChange, places} = props

    const numberInput = (key, value) => h('input', {
      type: 'number',
      min: 1,
      max: 8,
      step: 1,
      class: 'bn bg-transparent',
      key,
      value,
      onChange: (event) => {
        return onChange(key)(Number(event.target.value))
      }
    })

    return h('div', {class: 'ph2 striped--brand-light'}, [
      h('span', {class: 'fw9'}, [
        'coordinate places',
        h('span', {class: 'fa fa-angle-right mh1'})
      ]),
      numberInput('places[0]', places[0]),
      h('span', {class: 'fw9 mh2'}, ['.']),
      numberInput('places[1]', places[1])
    ])
  }
}

const Checkbox = {
  render({props, path}) {
    const {name, checked, onChange} = props

    return h('div', {class: 'ph2 striped--brand-light'}, [
      h('label', {for: path, class: 'pointer mr1 fw9'}, [name]),
      h('input', {id: path, type: 'checkbox', checked, onChange})
    ])
  }
}

const LayerSettingsItem = {
  render({props}) {
    const {setType, setConversionOpts, layer} = props
    const {id, layerType} = layer

    const conversionOpts = layer.conversionOpts || {}

    const layerSelect = h(Select, {
      name: 'layer type',
      value: layerType,
      options: ALL_LAYER_TYPES,
      contents: ALL_LAYER_NAMES,
      onChange: setType
    })

    const filetypeSelect = h(Select, {
      name: 'file type',
      value: conversionOpts.filetype,
      options: ['gerber', 'drill'],
      contents: ['gerber', 'drill'],
      onChange: (event) => setConversionOpts(id, conversionOpts, 'filetype')(event.target.value)
    })

    const zeroSelect = h(Select, {
      name: 'zero suppression',
      value: conversionOpts.zero,
      options: ['L', 'T'],
      contents: ['leading', 'trailing'],
      onChange: (event) => setConversionOpts(id, conversionOpts, 'zero')(event.target.value)
    })

    const unitsSelect = h(Select, {
      name: 'units',
      value: conversionOpts.units,
      options: ['in', 'mm'],
      contents: ['inches', 'millimeters'],
      onChange: (event) => setConversionOpts(id, conversionOpts, 'units')(event.target.value)
    })

    const placesSelect = h(PlacesSelect, {
      places: conversionOpts.places || [],
      onChange: setConversionOpts.bind(null, id, conversionOpts)
    })

    const notationSelect = h(Select, {
      name: 'notation',
      value: conversionOpts.nota,
      options: ['A', 'I'],
      contents: ['absolute', 'incremental'],
      onChange: (event) => setConversionOpts(id, conversionOpts, 'nota')(event.target.value)
    })

    const plotAsOutlineCheckbox = h(Checkbox, {
      name: 'plot as outline',
      checked: conversionOpts.plotAsOutline,
      onChange: (event) => setConversionOpts(id, conversionOpts, 'plotAsOutline')(event.target.checked)
    })

    return h('div', {class: 'f6 mt2'}, [
      layerSelect,
      filetypeSelect,
      unitsSelect,
      zeroSelect,
      notationSelect,
      placesSelect,
      plotAsOutlineCheckbox
    ])
  }
}

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
  },

  LayerDetailsItem({props}) {
    const {
      toggleVisibility,
      remove,
      setType,
      setConversionOpts,
      toggleSettings,
      showSettings,
      layer
    } = props
    const {filename, color, layerType, isVisible, isRendering} = layer
    const name = getFullName(layerType)

    const btnClass = 'pointer btn bn bg-transparent'
    const btnDisabled = isRendering

    const visibilityIcon = classnames('fa', {
      'fa-eye': isVisible,
      'fa-eye-slash': !isVisible
    })

    const settingsClass = classnames('collapsible', {
      'is-collapsed': !showSettings,
      'max-h5': showSettings
    })

    return h('li', {class: 'pv1'}, [
      h('div', {class: 'ph2 fx fx-ai-c ma0'}, [
        h('button', {
          class: 'pointer bn h2 w2 pa0 layer-opacity',
          style: `background-color: ${color}`
        }),
        h('span', {class: 'ml2 mr-auto'}, [
          h('p', {class: 'lh-title ma0 f6 b'}, [name]),
          h('p', {class: 'lh-title ma0 f6'}, [filename])
        ]),
        h('button', {class: btnClass, disabled: btnDisabled, onClick: toggleSettings}, [
          h('span', {class: 'fa fa-cog'})
        ]),
        h('button', {class: btnClass, disabled: btnDisabled, onClick: toggleVisibility}, [
          h('span', {class: visibilityIcon})
        ]),
        h('button', {class: btnClass, onClick: remove}, [
          h('span', {class: 'fa fa-trash'})
        ])
      ]),
      h('div', {class: settingsClass}, [
        h(LayerSettingsItem, {layer, setType, setConversionOpts})
      ])
    ])
  }
}
