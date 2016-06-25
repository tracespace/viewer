// little color picker

import {h} from 'deku'

export const ColorPicker = {
  render({props}) {
    const style = `background-color: ${props.color}`

    return h('button', {style, class: 'bn'}, [])
  }
}
