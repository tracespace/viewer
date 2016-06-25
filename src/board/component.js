
import {element} from 'deku'
import pcbStackupCore from 'pcb-stackup-core'
import whatsThatGerber from 'whats-that-gerber'

export const Board = {
  render({props}) {
    const layers = props.layers.map((layerModel) => {
      return {
        type: whatsThatGerber(layerModel.filename),
        converter: layerModel.render
      }
    })

    const stackupOptions = {
      id: 'board',
      maskWithOutline: true,
      createElement: element,
      includeNamespace: false
    }

    const stackup = pcbStackupCore(layers, stackupOptions)

    return element('div', {}, [
      element('div', {}, [stackup.top.svg]),
      element('div', {}, [stackup.bottom.svg])
    ])
  }
}
