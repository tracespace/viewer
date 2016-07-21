// app action tests
'use strict'

const test = require('ava')

const action = require('../../src/app/action')

test('it should be able to switch views', (assert) => {
  const result = action.switchView('board')

  assert.deepEqual(result, {type: action.SWITCH_VIEW, view: 'board'})
})

test('it should be able to zoom a view', (assert) => {
  const result = action.zoomView('layers', 0.1, 0.2, 0.3)

  assert.deepEqual(result, {
    type: action.ZOOM_VIEW,
    view: 'layers',
    zoom: 0.1,
    zoomX: 0.2,
    zoomY: 0.3,
    meta: {throttle: true}
  })
})

test('it should be able to pan a view', (assert) => {
  const result = action.panView('board', 0.1, 0.2)

  assert.deepEqual(result, {
    type: action.PAN_VIEW,
    view: 'board',
    panX: 0.1,
    panY: 0.2,
    meta: {throttle: true}
  })
})

test('it should be able to start panning', (assert) => {
  const result = action.startPan('layers', 0.1, 0.2)

  assert.deepEqual(result, {
    type: action.START_PAN,
    view: 'layers',
    startX: 0.1,
    startY: 0.2
  })
})

test('it should be able to end panning', (assert) => {
  const result = action.endPan('board', 0.1, 0.2)

  assert.deepEqual(result, {type: action.END_PAN, view: 'board'})
})

test('it should be able to toggle the settings drawer flag', (assert) => {
  const result = action.toggleLayerSettings('foo')

  assert.deepEqual(result, {type: action.TOGGLE_LAYER_SETTINGS, id: 'foo'})
})
