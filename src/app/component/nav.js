// top navigation bar component
'use strict'

const {h} = require('deku')

module.exports = function renderTopNav() {
  return h('header', {
    class: 'mb3 w-100 bg-white-90 brand-2 fx fx-ai-c fixed z-1'
  }, [
    h('img', {src: '/logo.svg', class: 'h3 w3 pa2 border-box'}),
    h('span', {class: 'mr-auto'}, [
      h('span', {class: 'f4 v-base'}, ['tracespace | ']),
      h('span', {class: 'f4 fw2 v-base'}, ['viewer'])
    ]),
    h('nav', {class: 'fr lh-copy f4'}, [
      h('a', {href: '#', class: 'border-box pa3 no-underline link brand-2 dim'}, ['about'])
    ])
  ])
}
