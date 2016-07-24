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
      selected: option.value === value,
      class: 'normal'
    })

    return h(Option, optionProps)
  })

  return h('label', {style, class: 'flex items-center ph2 lh-title pointer'}, [
    h('span', {class: 'flex items-center w-50 fw6'}, [
      h('span', {class: 'mr-auto'}, [name]),
      h('span', {class: 'fa fa-angle-right mh2'})
    ]),
    h('select', {
      id: path,
      class: 'flex-none input-reset inherit-color bn bg-transparent pointer',
      onChange: handleChange
    }, children)
  ])
}
