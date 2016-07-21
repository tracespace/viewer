// app reducer tests
'use strict'

const test = require('ava')

const layerAction = require('../../src/layer/action')
const action = require('../../src/app/action')
const reducer = require('../../src/app/reducer')

const EXPECTED_INITIAL_STATE = {
  view: 'layers',
  panZoom: {
    layers: {
      panStart: null,
      scale: 1,
      x: 0.5,
      y: 0.5
    },
    board: {
      panStart: null,
      scale: 1,
      x: 0.5,
      y: 0.5
    }
  },
  layers: {}
}

test('it should have the correct namespace', (assert) => {
  assert.is(reducer.NAME, 'app')
})

test('is should have the correct initial state', (assert) => {
  const state = reducer(undefined, {})

  assert.deepEqual(state, EXPECTED_INITIAL_STATE)
})

test('it should handle a SWITCH_VIEW', (assert) => {
  const switchToBoard = {type: action.SWITCH_VIEW, view: 'board'}
  const switchToLayers = {type: action.SWITCH_VIEW, view: 'layers'}
  let state = EXPECTED_INITIAL_STATE

  state = reducer(state, switchToBoard)
  assert.is(state.view, 'board')

  state = reducer(state, switchToLayers)
  assert.is(state.view, 'layers')
})

test('it should be able to handle ZOOM_VIEW', (assert) => {
  const zoomLayers = {type: action.ZOOM_VIEW, view: 'layers', zoom: 0.1, zoomX: 0.2, zoomY: 0.3}
  const zoomBoard = {type: action.ZOOM_VIEW, view: 'board', zoom: 0.4, zoomX: 0.5, zoomY: 0.6}
  let state = EXPECTED_INITIAL_STATE

  state = reducer(state, zoomLayers)
  assert.deepEqual(state.panZoom, {
    layers: {panStart: null, scale: 1.1, x: 0.53, y: 0.52},
    board: {panStart: null, scale: 1, x: 0.5, y: 0.5}
  })

  state = reducer(state, zoomBoard)
  assert.deepEqual(state.panZoom, {
    layers: {panStart: null, scale: 1.1, x: 0.53, y: 0.52},
    board: {panStart: null, scale: 1.4, x: 0.5, y: 0.46}
  })
})

test('it should be able to handle START_PAN', (assert) => {
  const startPanLayers = {type: action.START_PAN, view: 'layers', startX: 0.2, startY: 0.3}
  const startPanBoard = {type: action.START_PAN, view: 'board', startX: 0.5, startY: 0.6}
  let state = EXPECTED_INITIAL_STATE

  state = reducer(state, startPanLayers)
  assert.deepEqual(state.panZoom, {
    layers: {panStart: [0.2, 0.3], scale: 1, x: 0.5, y: 0.5},
    board: {panStart: null, scale: 1, x: 0.5, y: 0.5}
  })

  state = reducer(state, startPanBoard)
  assert.deepEqual(state.panZoom, {
    layers: {panStart: [0.2, 0.3], scale: 1, x: 0.5, y: 0.5},
    board: {panStart: [0.5, 0.6], scale: 1, x: 0.5, y: 0.5}
  })
})

test('it should be able to handle END_PAN', (assert) => {
  const endPanLayers = {type: action.END_PAN, view: 'layers'}
  const endPanBoard = {type: action.END_PAN, view: 'board'}
  let state = Object.assign({}, EXPECTED_INITIAL_STATE, {
    panZoom: {
      layers: {panStart: [0.2, 0.3], scale: 1, x: 0.5, y: 0.5},
      board: {panStart: [0.5, 0.6], scale: 1, x: 0.5, y: 0.5}
    }
  })

  state = reducer(state, endPanLayers)
  assert.deepEqual(state.panZoom, {
    layers: {panStart: null, scale: 1, x: 0.5, y: 0.5},
    board: {panStart: [0.5, 0.6], scale: 1, x: 0.5, y: 0.5}
  })

  state = reducer(state, endPanBoard)
  assert.deepEqual(state.panZoom, {
    layers: {panStart: null, scale: 1, x: 0.5, y: 0.5},
    board: {panStart: null, scale: 1, x: 0.5, y: 0.5}
  })
})

test('it should be able to handle PAN_VIEW', (assert) => {
  const panLayers = {type: action.PAN_VIEW, view: 'layers', panX: 0.4, panY: 0.5}
  const panBoard = {type: action.PAN_VIEW, view: 'board', panX: 0.4, panY: 0.5}
  let state = EXPECTED_INITIAL_STATE

  // if panStart is null, the view should not pan
  assert.deepEqual(reducer(state, panLayers), EXPECTED_INITIAL_STATE)
  assert.deepEqual(reducer(state, panBoard), EXPECTED_INITIAL_STATE)

  // otherwise, pan if there is a starting point
  state = Object.assign({}, EXPECTED_INITIAL_STATE, {
    panZoom: {
      layers: {panStart: [0.2, 0.3], scale: 1, x: 0.5, y: 0.5},
      board: {panStart: [0.5, 0.6], scale: 1, x: 0.5, y: 0.5}
    }
  })

  state = reducer(state, panLayers)
  assert.deepEqual(state.panZoom, {
    layers: {panStart: [0.4, 0.5], scale: 1, x: 0.7, y: 0.7},
    board: {panStart: [0.5, 0.6], scale: 1, x: 0.5, y: 0.5}
  })

  state = reducer(state, panBoard)
  assert.deepEqual(state.panZoom, {
    layers: {panStart: [0.4, 0.5], scale: 1, x: 0.7, y: 0.7},
    board: {panStart: [0.4, 0.5], scale: 1, x: 0.4, y: 0.4}
  })
})

test('it should be able to handle an layer.ADD action', (assert) => {
  const addAction = {type: layerAction.ADD, id: 'foo'}
  const state = reducer(EXPECTED_INITIAL_STATE, addAction)

  assert.deepEqual(state.layers, {foo: {showSettings: false}})
})

test('it should be able to handle a layer.REMOVE action', (assert) => {
  const removeAction = {type: layerAction.REMOVE, id: 'bar'}
  let state = Object.assign({}, EXPECTED_INITIAL_STATE, {layers: {bar: {showSettings: false}}})

  state = reducer(state, removeAction)
  assert.deepEqual(state.layers, {})
})

test('it shoud be able to handle a TOGGLE_LAYER_SETTINGS action', (assert) => {
  const toggleAction = {type: action.TOGGLE_LAYER_SETTINGS, id: 'foo'}
  let state = Object.assign({}, EXPECTED_INITIAL_STATE, {layers: {foo: {showSettings: false}}})

  state = reducer(state, toggleAction)
  assert.deepEqual(state.layers, {foo: {showSettings: true}})

  state = reducer(state, toggleAction)
  assert.deepEqual(state.layers, {foo: {showSettings: false}})
})
