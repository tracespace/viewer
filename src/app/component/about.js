// about sliding modal component
'use strict'

const {h} = require('deku')
const classnames = require('classnames')

// grab content from repoisitory readme
const content = require('../../../README.md')

const CloseButton = ({props}) => {
  const {isOpen, onClick} = props
  const classNames = classnames(
    'fixed top-1 right-2',
    'pa2',
    'app-bg-brand white link dim',
    {dn: !isOpen})

  return h('a', {href: '#', class: classNames, onClick}, [
    h('span', {class: 'fa fa-times mr2'}),
    'close'
  ])
}

module.exports = function renderAbout({props}) {
  const {isOpen, open} = props
  const modalClassNames = classnames(
    'fixed right-0 z-2',
    'w-100 h-100 shrink',
    'pointer',
    (!isOpen) ? 'mw0' : 'mw-100')

  const handleClose = (event) => {
    event.stopPropagation()
    event.preventDefault()

    if (event.target === event.currentTarget) {
      open(false)
    }
  }
  return h('div', {
    class: modalClassNames,
    onClick: handleClose
  }, [
    h('div', {class: 'w7 h-100 fr bg-white pl3 overflow-auto cursor-auto'}, [
      h('div', {innerHTML: content}),
      h(CloseButton, {isOpen, onClick: handleClose})
    ])
  ])
}
