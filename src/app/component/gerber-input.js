// gerber file input component
'use strict'

const {h} = require('deku')

module.exports = function renderGerberInput({props, path}) {
  return h('div', {class: 'bg-white pt1'}, [
    h('input', {
      id: path,
      type: 'file',
      multiple: true,
      onChange: props.addGerber,
      class: 'dn'
    }),

    h('label', {
      for: path,
      class: 'pointer db w-auto tc border-box f3 bg-brand near-white'
    }, ['+'])
  ])
}
