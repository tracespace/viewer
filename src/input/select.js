// checkbox component
'use strict'

const {h} = require('deku')

const Option = ({props}) => {
  const {value, selected, title} = props

  return h('option', {value, selected}, [title])
}

module.exports = function renderSelect({props, path}) {
  const {style, name, value, options, onChange} = props
  const handleChange = (event) => onChange(event.target.value)

  const children = options.map((option) => {
    const optionProps = Object.assign({}, option, {
      selected: option.value === value
    })

    return h(Option, optionProps)
  })

  return h('label', {style, class: 'db ph2 pointer'}, [
    h('span', {class: 'b'}, [name]),
    h('span', {class: 'fa fa-angle-right mh1'}),
    h('select', {
      id: path,
      class: 'input-reset inherit-color bn bg-transparent pointe',
      onChange: handleChange
    }, children)
  ])
}
