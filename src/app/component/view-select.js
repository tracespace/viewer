// app view select

import {h} from 'deku'

export const ViewSelect = {
  render({props}) {
    return h('div', {class: 'bg-white'}, [
      h('button', {
        class: 'pointer btn bn w-50 f5 bg-white',
        onClick: props.switchView('layers')
      }, ['layers']),

      h('button', {
        class: 'pointer btn bn w-50 f5 bg-near-white',
        onClick: props.switchView('board')
      }, ['board'])
    ])
  }
}
