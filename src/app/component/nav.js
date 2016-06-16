// top navigation bar component

import {h} from 'deku'

export const TopNav = {
  render() {
    return h('header', {class: 'h3 mb3 w-100 cf bg-white gray v-mid sans-serif'}, [
      h('div', {class: 'h-100 dib'}, [
        h('img', {src: '/logo.svg', class: 'v-mid h-100 pa2 border-box'}),
        h('span', {class: 'v-mid f3'}, ['tracespace']),
        h('span', {class: 'v-mid f4 fw2'}, [' | viewer']),
      ]),
      h('nav', {class: 'h-100 fr lh-copy f4'}, [
        h('a', {href: '#', class: 'border-box dib pa3 no-underline link gray hover-dark-gray focus-dark-gray'}, ['about'])
      ])
    ])
  }
}
