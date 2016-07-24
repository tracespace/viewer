// top navigation bar component
'use strict'

const {h} = require('deku')

module.exports = function renderTopNav() {
  return h('header', {
    class: 'mb3 w-100 bg-white-90 app-dark flex items-center fixed z-1'
  }, [
    h('img', {src: '/logo.svg', class: 'h3 w3 pa2 border-box'}),
    h('span', {class: 'mr-auto'}, [
      h('span', {class: 'f4 v-base'}, ['tracespace | ']),
      h('span', {class: 'f4 fw3 v-base'}, ['viewer'])
    ]),
    h('nav', {class: 'fr lh-copy f4'}, [
      h('a', {href: '#', class: 'border-box pa3 no-underline link app-dark dim'}, ['about'])
    ])
  ])
}
