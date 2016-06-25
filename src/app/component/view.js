// main board / layer view

import {h} from 'deku'
import {Layers} from '../../layer/component'
import {Board} from '../../board/component'

export const View = {
  render({props}) {
    const {view, layers} = props
    const renderView = (view === 'layers')
      ? Layers
      : Board

    return h('div', {class: 'w-100 h-100'}, [
      h(renderView, {layers})
    ])
  }
}
