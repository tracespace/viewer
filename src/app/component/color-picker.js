// little color picker
'use strict'

const {h} = require('deku')

module.exports = function renderColorPicker({props, path}) {
  const {color, onChange} = props

  return h('div', {class: 'h2 w2'}, [
    h('input', {onChange, id: path, type: 'color', value: color, class: 'clip'}),
    h('label', {
      for: path,
      class: 'btn pointer db w-100 h-100',
      style: `background-color: ${color}`
    })
  ])
}
