// little color picker
'use strict'

const {h} = require('deku')

module.exports = function renderColorPicker({props}) {
  return h('button', {
    style: `background-color: ${props.color}`,
    class: 'bn'
  })
}
