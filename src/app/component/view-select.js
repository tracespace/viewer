// app view select

import {h} from 'deku'

export const ViewSelect = {
  render({props}) {
    return h('div', {}, [
      h('button', {
        class: 'bn w-50 f3 bg-near-white',
        onClick: props.switchView('layers')
      }, ['layers']),

      h('button', {
        class: 'bn w-50 f3 bg-white',
        onClick: props.switchView('board')
      }, ['board'])
    ])
  }
}
