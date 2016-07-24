// checkbox component
'use strict'

const {h} = require('deku')

module.exports = function renderCheckbox({props, path}) {
  const {name, checked, onChange} = props
  const handleChange = (event) => onChange(event.target.checked)

  return h('label', {class: 'db ph2 lh-title pointer'}, [
    h('input', {id: path, type: 'checkbox', checked, onChange: handleChange}),
    h('span', {class: 'ml2 fw6'}, [name])
  ])
}
