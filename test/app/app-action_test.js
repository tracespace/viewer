// app action tests
'use strict'

const test = require('ava')

const action = require('../../src/app/action')

test('it should be able to switch views', (t) => {
  const result = action.switchView('board')

  t.deepEqual(result, {type: action.SWITCH_VIEW, view: 'board'})
})

test('it should be able to fit a view', (t) => {
  const result = action.fitView('layers')

  t.deepEqual(result, {
    type: action.FIT_VIEW,
    view: 'layers'
  })
})

test('it should be able to zoom a view', (t) => {
  const result = action.zoomView('layers', 0.1, 0.2, 0.3)

  t.deepEqual(result, {
    type: action.ZOOM_VIEW,
    view: 'layers',
    zoom: 0.1,
    zoomX: 0.2,
    zoomY: 0.3,
    meta: {throttle: true}
  })
})

test('it should be able to pan a view', (t) => {
  const result = action.panView('board', 0.1, 0.2)

  t.deepEqual(result, {
    type: action.PAN_VIEW,
    view: 'board',
    panX: 0.1,
    panY: 0.2,
    meta: {throttle: true}
  })
})

test('it should be able to start panning', (t) => {
  const result = action.startPan('layers', 0.1, 0.2)

  t.deepEqual(result, {
    type: action.START_PAN,
    view: 'layers',
    startX: 0.1,
    startY: 0.2
  })
})

test('it should be able to end panning', (t) => {
  const result = action.endPan('board', 0.1, 0.2)

  t.deepEqual(result, {type: action.END_PAN, view: 'board'})
})

test('it should be able to pan in discrete amounts', (t) => {
  const result = action.discretePan('layers', 'left')

  t.deepEqual(result, {type: action.DISCRETE_PAN, view: 'layers', direction: 'left'})
})

test('it should be able to zoom to a specific level', (t) => {
  const result = action.zoomTo('board', 0.5)

  t.deepEqual(result, {
    type: action.ZOOM_TO,
    view: 'board',
    zoom: 0.5,
    meta: {throttle: true}
  })
})

test('it should be able to toggle the settings drawer flag', (t) => {
  const result = action.toggleLayerSettings('foo')

  t.deepEqual(result, {type: action.TOGGLE_LAYER_SETTINGS, id: 'foo'})
})
