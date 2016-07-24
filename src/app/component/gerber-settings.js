// gerber settings panel
'use strict'

const {h} = require('deku')
const {getAllTypes, getFullName} = require('whats-that-gerber')
const classnames = require('classnames')

const Checkbox = require('../../input/checkbox')
const Select = require('../../input/select')

const ALL_LAYER_OPTIONS = getAllTypes().map((type) => {
  return {value: type, title: getFullName(type)}
})

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

const LayerSettingsItem = {
  render({props}) {
    const {setType, setConversionOpts, layer} = props
    const {id, layerType} = layer

    const conversionOpts = layer.conversionOpts || {}

    const layerSelect = h(Select, {
      name: 'layer type',
      value: layerType,
      options: ALL_LAYER_OPTIONS,
      onChange: setType
    })

    const filetypeSelect = h(Select, {
      name: 'file type',
      value: conversionOpts.filetype,
      options: [
        {title: 'gerber', value: 'gerber'},
        {title: 'drill', value: 'drill'}
      ],
      onChange: setConversionOpts(id, conversionOpts, 'filetype')
    })

    const zeroSelect = h(Select, {
      name: 'zero suppression',
      value: conversionOpts.zero,
      options: [
        {title: 'leading', value: 'L'},
        {title: 'trailing', value: 'T'}
      ],
      onChange: setConversionOpts(id, conversionOpts, 'zero')
    })

    const unitsSelect = h(Select, {
      name: 'units',
      value: conversionOpts.units,
      options: [
        {title: 'inches', value: 'in'},
        {title: 'millimeters', value: 'mm'}
      ],
      onChange: setConversionOpts(id, conversionOpts, 'units')
    })

    const placesSelect = h(PlacesSelect, {
      places: conversionOpts.places || [],
      onChange: setConversionOpts.bind(null, id, conversionOpts)
    })

    const notationSelect = h(Select, {
      name: 'notation',
      value: conversionOpts.nota,
      options: [
        {title: 'absolute', value: 'A'},
        {title: 'incremental', value: 'I'}
      ],
      onChange: setConversionOpts(id, conversionOpts, 'nota')
    })

    const plotAsOutlineCheckbox = h(Checkbox, {
      name: 'plot as outline',
      checked: conversionOpts.plotAsOutline,
      onChange: setConversionOpts(id, conversionOpts, 'plotAsOutline')
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

const ColorPicker = {
  render({props, path}) {
    const {color, onChange} = props

    return h('label', {
      class: 'h2 w2 fx-0-0 btn pointer',
      style: `background-color: ${color}`
    }, [
      h('input', {onChange, id: path, type: 'color', value: color, class: 'clip'})
    ])
  }
}

module.exports = function renderLayerDetailsItem({props}) {
  const {
    toggleVisibility,
    remove,
    setType,
    setConversionOpts,
    setColor,
    toggleSettings,
    showSettings,
    layer
  } = props

  const {filename, color, layerType, isVisible, isRendering} = layer
  const name = getFullName(layerType)

  const btnClass = 'pointer btn bn bg-transparent dim'
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
      h(ColorPicker, {color, onChange: setColor}),
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
