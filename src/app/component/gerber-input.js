// gerber file input component
'use strict'

const {h} = require('deku')

module.exports = function renderGerberInput({props, path}) {
  return h('div', {class: 'bg-white-90 pt1 click flex-none'}, [
    h('input', {
      id: path,
      type: 'file',
      multiple: true,
      onChange: props.addGerber,
      class: 'clip'
    }),

    h('label', {
      for: path,
      class: 'pointer btn db w-auto tc border-box f3 dim app-bg-brand near-white'
    }, ['+'])
  ])
}
