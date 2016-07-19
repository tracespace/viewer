// main board / layer view

import {h} from 'deku'
import {Layers} from '../../layer/component'
import {Board} from '../../board/component'

export const View = {
  render({props}) {
    const {
      view,
      panZoom,
      layers,
      totalViewbox,
      handleZoom,
      handlePan,
      handleStartPan,
      handleEndPan
    } = props

    const renderView = (view === 'layers')
      ? Layers
      : Board

    const {x, y, scale} = panZoom
    const left = `${(x - 0.5) * 100}%`
    const top = `${(y - 0.5) * 100}%`
    const style = `transform: translate(${left}, ${top}) scale(${scale})`

    const attributes = {
      class: 'w-100 h-100 grab relative',
      onWheel: handleZoom(view),
      onMouseDown: handleStartPan(view)
    }

    if (panZoom.panStart) {
      const endPan = handleEndPan(view)

      attributes.onMouseMove = handlePan(view)
      attributes.onMouseUp = endPan,
      attributes.onMouseLeave = endPan
    }

    return h('div', attributes, [
      h('div', {style, class: 'w-100 h-100'}, [
        h('div', {class: 'absolute w-100 left-50 top-50 transform-center'}, [
          h(renderView, {layers, totalViewbox})
        ])
      ])
    ])
  }
}
