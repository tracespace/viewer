// list of layers component

import {element} from 'deku'

export const GerberInput = {
  render({props, path}) {
    return element('div', {}, [
      element('input', {
        id: path,
        type: 'file',
        multiple: true,
        onChange: props.addGerber,
        class: 'dn'
      }),

      element('label', {for: path, class: 'db w-auto ma3 tc border-box f3 bg-near-white'}, ['+'])
    ])
  }
}
