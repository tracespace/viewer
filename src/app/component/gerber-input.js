// list of layers component

import {element} from 'deku'

export default function renderGerberInput({props, path}) {
  return element('div', {}, [
    element('input', {
      id: path,
      type: 'file',
      multiple: true,
      onChange: props.onChange
    }),
    element('label', {for: path})
  ])
}
