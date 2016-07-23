// app view select
'use strict'

const {h} = require('deku')
const classnames = require('classnames')

const renderViewSelectButton = function({props}) {
  const {name, view, switchView} = props
  const bg = (name === view) ? '' : 'bg-black-20'

  return h('a', {
    class: classnames('btn dib w-50 f5 link dim brand-2 tc pv1', bg),
    href: '#',
    onClick: switchView(name)
  }, [name])
}

module.exports = function renderViewSelect({props}) {
  const {view, switchView} = props

  return h('div', {class: 'bg-white-90 clickable'}, [
    h(renderViewSelectButton, {name: 'layers', view, switchView}),
    h(renderViewSelectButton, {name: 'board', view, switchView})
  ])
}
