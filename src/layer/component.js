// layer components

import {h} from 'deku'
import renderLayer from 'gerber-to-svg/lib/render'
import viewBox from 'pcb-stackup-core/lib/view-box'

import style from './style.css'

const randomByte = () => Math.floor(Math.random() * 256)

const randomColor = () => {
  return `rgba(${randomByte()},${randomByte()},${randomByte()},0.7)`
}

export const Layer = {
  render({props}) {
    const attr = {id: props.id, color: randomColor()}

    return renderLayer(props.render, attr, h, false)
  }
}

export const Layers = {
  render({props}) {
    return h('div', {}, props.layers.map((layerModel) => {
      return h(Layer, layerModel)
    }))
  }
}

export const StackedLayers = {
  render({props}) {
    const layers = props.layers

    const totalViewbox = layers.reduce((result, layerModel) => {
      return viewBox.add(result, layerModel.render.viewBox)
    }, viewBox.new())

    const offset = (totalViewbox.length) ? totalViewbox : [0, 0, 0, 0]

    const width = offset[2]
    const height = offset[3]

    const handleWheel = (event) => {
      console.log(`x: ${event.deltaX}, y: ${event.deltaY}, z: ${event.deltaZ}`)
    }

    const layerElements = layers.map((layerModel) => {
      const box = layerModel.render.viewBox
      const top = box[1] + box[3]
      const offsetTop = offset[1] + offset[3]
      const topDifference = offsetTop - top

      return h('use', {
        'xlink:href': `#${layerModel.id}`,
        x: `${(box[0] - offset[0]) / offset[2] * 100}%`,
        y: `${topDifference / offset[3] * 100}%`,
        color: randomColor()
      })
    })

    return h('div', {
      style: 'width: 720px; height: 720px; overflow: hidden',
      onWheel: handleWheel
    }, [
      h('svg', {
        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
        width: `${width / 1000}in`,
        height: `${height / 1000}in`,
        style: 'transform: scale(4.0); transform-origin: top left;'
      }, layerElements)
    ])
  }
}

// export const layerNameList = {
//   render({props}) {
//     const layers = props.layers
//
//
//   }
// }
