// pan-zoom controls component
'use strict'

const {h} = require('deku')

const {ZOOM_SCALE_MIN, ZOOM_SCALE_MAX} = require('../constant')

const SCALE_MIN = Math.log(ZOOM_SCALE_MIN)
const SCALE_MAX = Math.log(ZOOM_SCALE_MAX)
const SCALE_RANGE = SCALE_MAX - SCALE_MIN

const highlight = 'white-80'
const PAN_BUTTON_ICONS = {
  right: [
    h('path', {d: 'M 39 25 61 50 39 75', 'stroke-width': 40, class: highlight}),
    h('path', {d: 'M 39 25 61 50 39 75'})
  ],
  down: [
    h('path', {d: 'M 25 39 50 61 75 39', 'stroke-width': 40, class: highlight}),
    h('path', {d: 'M 25 39 50 61 75 39'})
  ],
  left: [
    h('path', {d: 'M 61 25 39 50 61 75', 'stroke-width': 40, class: highlight}),
    h('path', {d: 'M 61 25 39 50 61 75'})
  ],
  up: [
    h('path', {d: 'M 25 61 50 39 75 61', 'stroke-width': 40, class: highlight}),
    h('path', {d: 'M 25 61 50 39 75 61'})
  ],
  fit: [
    h('circle', {cx: 50, cy: 50, r: 45, fill: 'currentColor', stroke: 'none', class: highlight}),
    h('circle', {cx: 50, cy: 50, r: 40, fill: 'currentColor', stroke: 'none'})
  ]
}

const PanButton = {
  render({props}) {
    const {direction, onClick} = props
    const icon = PAN_BUTTON_ICONS[direction]
    const className = 'dib bn pointer bg-transparent pa0 click w-1-3 h-100'

    return h('button', {
      class: className,
      onClick: () => onClick(direction)
    }, [
      h('svg', {
        viewBox: '0 0 100 100',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-linecap': 'square',
        'stroke-width': 30,
        class: 'w-100 h-100 app-dark dim link'
      }, icon)
    ])
  }
}

const PanButtonRow = {
  render({children}) {
    return h('div', {class: 'h-1-3 w-100'}, children)
  }
}

const PanSpacer = {
  render() {
    return h('span', {class: 'dib w-1-3'})
  }
}

const PanControl = {
  render({props}) {
    const {handleFit, handleDiscretePan: onClick} = props

    return h('div', {class: 'w-100 aspect-ratio aspect-ratio--1x1'}, [
      h('div', {class: 'aspect-ratio--object'}, [
        h(PanButtonRow, {},  [
          h(PanSpacer),
          h(PanButton, {direction: 'up', onClick}),
          h(PanSpacer)
        ]),
        h(PanButtonRow, {}, [
          h(PanButton, {direction: 'left', onClick}),
          h(PanButton, {direction: 'fit', onClick: handleFit}),
          h(PanButton, {direction: 'right', onClick})
        ]),
        h(PanButtonRow, {}, [
          h(PanSpacer),
          h(PanButton, {direction: 'down', onClick}),
          h(PanSpacer)
        ])
      ])
    ])
  }
}

const ZoomBar = {
  render({props}) {
    const {handleMouseEvent} = props

    return h('div', {
      onMouseDown: handleMouseEvent,
      onMouseMove: handleMouseEvent,
      class: 'w-50 h-100 m-auto bg-white-90 click pointer grab'
    })
  }
}

const ZoomControl = {
  render({props}) {
    const {scale, labelId, handleZoomTo} = props

    const scalePc = `${scale * 100}%`
    const scaleLog = Math.log(scale)
    const top = (SCALE_MAX - scaleLog) / SCALE_RANGE * 100
    const handleMouseEvent = (event) => {
      if (event.buttons) {
        const offset = event.offsetY / event.currentTarget.clientHeight
        const zoom = Math.pow(Math.E, SCALE_MAX - offset * SCALE_RANGE)

        handleZoomTo(zoom)
      }
    }

    return h('div', {class: 'w-100 h-100 relative dim-child'}, [
      h(ZoomBar, {handleMouseEvent}),
      h('span', {
        class: 'absolute w-100 border-box h1 left-0 app-bg-dark dim ba b--white-80 child',
        style: `top: calc(${top}% - 0.5rem);`,
        role: 'slider',
        tabindex: 0,
        'aria-valuemin': ZOOM_SCALE_MIN,
        'aria-valuemax': ZOOM_SCALE_MAX,
        'aria-valuenow': scaleLog,
        'aria-valuetext': `${scalePc}%`,
        'aria-labelledby': labelId
      })
    ])
  }
}

module.exports = function renderPanZoomControls({props}) {
  const {panZoom, handleFit, handleDiscretePan, handleZoomTo} = props

  return h('div', {
    class: 'w-5 mh3 app-mt3-past-nav fixed left-0 z-1 click-none'
  }, [
    h('div', {class: 'mb3'}, [
      h(PanControl, {handleFit, handleDiscretePan})
    ]),
    h('div', {class: 'h5 w1 mh-auto'}, [
      h(ZoomControl, {handleZoomTo, scale: panZoom.scale, labelId: 'foobar'})
    ])
  ])
}
