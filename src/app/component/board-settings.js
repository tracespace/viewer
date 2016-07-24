// board settings panel
'use strict'

const {h, vnode} = require('deku')
const Color = require('color')

const Select = require('../../input/select')
const Checkbox = require('../../input/checkbox')

const COLOR_OPTIONS = [
  {
    name: 'soldermask',
    type: 'sm',
    options: [
      {title: 'red', value: 'rgba(139, 0, 0, 0.75)'},
      {title: 'teal', value: 'rgba(0, 113, 117, 0.75)'},
      {title: 'yellow', value: 'rgba(255, 255, 102, 0.75)'},
      {title: 'green', value: 'rgba(0, 66, 0, 0.75)'},
      {title: 'blue', value: 'rgba(0, 0, 128, 0.75)'},
      {title: 'purple', value: 'rgba(75, 0, 130, 0.75)'},
      {title: 'black', value: 'rgba(0, 0, 0, 0.75)'},
      {title: 'white', value: 'rgba(255, 255, 255, 0.9)'}
    ]
  },
  {
    name: 'silkscreen',
    type: 'ss',
    options: [
      {title: 'red', value: '#f00'},
      {title: 'yellow', value: '#ff0'},
      {title: 'green', value: '#090'},
      {title: 'blue', value: '#00f'},
      {title: 'black', value: '#000'},
      {title: 'white', value: '#fff'}
    ]
  },
  {
    name: 'copper fill',
    type: 'cf',
    options: [
      {title: 'bare', value: '#c63'},
      {title: 'gold', value: '#c93'},
      {title: 'Ni/Au', value: '#f5f5f5'},
      {title: 'HASL', value: '#ccc'}
    ]
  }
]

const ColorSelect = ({props}) => {
  const {name, value, options, onChange} = props

  const backgroundColor = value
  const color = Color(value).dark()
    ? 'white'
    : 'black'

  const style = `background-color: ${backgroundColor}; color: ${color}`

  return h(Select, {style, name, value, options, onChange})
}

module.exports = function renderBoardSettings({props}) {
  const {view, board, handleSetMaskWithOutline, handleSetColor} = props

  if (view !== 'board') {
    return vnode.createEmptyElement()
  }

  const colorSelects = COLOR_OPTIONS.map((select) => {
    const {name, type, options} = select
    const value = board.color[type]
    const onChange = handleSetColor(type)

    return h(ColorSelect, {name, value, options, onChange})
  })

  return h('div', {class: 'fx-0-0 w-100 clickable f5 pb2 bg-white-90'}, [
    h(Checkbox, {
      name: 'mask with outline',
      checked: board.maskWithOutline,
      onChange: handleSetMaskWithOutline()
    }),
    h('div', {}, colorSelects)
  ])
}
