// app reducer tests
'use strict'

const test = require('ava')

const layerAction = require('../../src/layer/action')
const action = require('../../src/app/action')
const reducer = require('../../src/app/reducer')
const {
  FIT_BASE_X,
  FIT_BASE_Y,
  PAN_DISCRETE_AMOUNT
} = require('../../src/app/constant')

const EXPECTED_INITIAL_STATE = {
  view: 'layers',
  panZoom: {
    layers: {panStart: null, scale: 1, x: 0, y: 0},
    board: {panStart: null, scale: 1, x: 0, y: 0}
  },
  layers: {}
}

const PAN_ZOOM_TEST_STATE = {
  view: 'layers',
  panZoom: {
    layers: {panStart: null, scale: 0.5, x: 0.5, y: 0.5},
    board: {panStart: null, scale: 0.5, x: 0.5, y: 0.5}
  },
  layers: {}
}

test('it should have the correct namespace', (t) => {
  t.is(reducer.NAME, 'app')
})

test('is should have the correct initial state', (t) => {
  const state = reducer(undefined, {})

  t.deepEqual(state, EXPECTED_INITIAL_STATE)
})

test('it should be able to handle a SWITCH_VIEW', (t) => {
  const switchToBoard = {type: action.SWITCH_VIEW, view: 'board'}
  const switchToLayers = {type: action.SWITCH_VIEW, view: 'layers'}
  let state = EXPECTED_INITIAL_STATE

  state = reducer(state, switchToBoard)
  t.is(state.view, 'board')

  state = reducer(state, switchToLayers)
  t.is(state.view, 'layers')
})

test('it should be able to handle a FIT_VIEW', (t) => {
  const fitLayers = {type: action.FIT_VIEW, view: 'layers'}
  const state = reducer(PAN_ZOOM_TEST_STATE, fitLayers)

  t.deepEqual(state.panZoom, {
    layers: {panStart: null, scale: 1, x: 0, y: 0},
    board: {panStart: null, scale: 0.5, x: 0.5, y: 0.5}
  })
})

test('it should be able to handle ZOOM_VIEW', (t) => {
  const zoomLayers = {type: action.ZOOM_VIEW, view: 'layers', zoom: 0.1, zoomX: 0.2, zoomY: 0.3}
  const zoomBoard = {type: action.ZOOM_VIEW, view: 'board', zoom: 0.4, zoomX: 0.5, zoomY: 0.6}
  let state = PAN_ZOOM_TEST_STATE

  state = reducer(state, zoomLayers)
  t.deepEqual(state.panZoom, {
    layers: {
      panStart: null,
      scale: 0.55,
      x: 0.5 + 0.1 * (0.5 - 0.2 + FIT_BASE_X),
      y: 0.5 + 0.1 * (0.5 - 0.3 + FIT_BASE_Y)
    },
    board: {panStart: null, scale: 0.5, x: 0.5, y: 0.5}
  })

  state = reducer(state, zoomBoard)
  t.deepEqual(state.panZoom, {
    layers: {
      panStart: null,
      scale: 0.55,
      x: 0.5 + 0.1 * (0.5 - 0.2 + FIT_BASE_X),
      y: 0.5 + 0.1 * (0.5 - 0.3 + FIT_BASE_Y)
    },
    board: {
      panStart: null,
      scale: 0.7,
      x: 0.5 + 0.4 * (0.5 - 0.5 + FIT_BASE_X),
      y: 0.5 + 0.4 * (0.5 - 0.6 + FIT_BASE_Y)
    }
  })
})

test('it should be able to handle START_PAN', (t) => {
  const startPanLayers = {type: action.START_PAN, view: 'layers', startX: 0.2, startY: 0.3}
  const startPanBoard = {type: action.START_PAN, view: 'board', startX: 0.5, startY: 0.6}
  let state = PAN_ZOOM_TEST_STATE

  state = reducer(state, startPanLayers)
  t.deepEqual(state.panZoom, {
    layers: {panStart: [0.2, 0.3], scale: 0.5, x: 0.5, y: 0.5},
    board: {panStart: null, scale: 0.5, x: 0.5, y: 0.5}
  })

  state = reducer(state, startPanBoard)
  t.deepEqual(state.panZoom, {
    layers: {panStart: [0.2, 0.3], scale: 0.5, x: 0.5, y: 0.5},
    board: {panStart: [0.5, 0.6], scale: 0.5, x: 0.5, y: 0.5}
  })
})

test('it should be able to handle END_PAN', (t) => {
  const endPanLayers = {type: action.END_PAN, view: 'layers'}
  const endPanBoard = {type: action.END_PAN, view: 'board'}
  let state = Object.assign({}, PAN_ZOOM_TEST_STATE, {
    panZoom: {
      layers: {panStart: [0.2, 0.3], scale: 0.5, x: 0.5, y: 0.5},
      board: {panStart: [0.5, 0.6], scale: 0.5, x: 0.5, y: 0.5}
    }
  })

  state = reducer(state, endPanLayers)
  t.deepEqual(state.panZoom, {
    layers: {panStart: null, scale: 0.5, x: 0.5, y: 0.5},
    board: {panStart: [0.5, 0.6], scale: 0.5, x: 0.5, y: 0.5}
  })

  state = reducer(state, endPanBoard)
  t.deepEqual(state.panZoom, {
    layers: {panStart: null, scale: 0.5, x: 0.5, y: 0.5},
    board: {panStart: null, scale: 0.5, x: 0.5, y: 0.5}
  })
})

test('it should be able to handle PAN_VIEW', (t) => {
  const panLayers = {type: action.PAN_VIEW, view: 'layers', panX: 0.4, panY: 0.5}
  const panBoard = {type: action.PAN_VIEW, view: 'board', panX: 0.4, panY: 0.5}
  let state = PAN_ZOOM_TEST_STATE

  // if panStart is null, the view should not pan
  t.deepEqual(reducer(state, panLayers), PAN_ZOOM_TEST_STATE)
  t.deepEqual(reducer(state, panBoard), PAN_ZOOM_TEST_STATE)

  // otherwise, pan if there is a starting point
  state = Object.assign({}, EXPECTED_INITIAL_STATE, {
    panZoom: {
      layers: {panStart: [0.2, 0.3], scale: 0.5, x: 0.5, y: 0.5},
      board: {panStart: [0.5, 0.6], scale: 0.5, x: 0.5, y: 0.5}
    }
  })

  state = reducer(state, panLayers)
  t.deepEqual(state.panZoom, {
    layers: {panStart: [0.4, 0.5], scale: 0.5, x: 0.7, y: 0.7},
    board: {panStart: [0.5, 0.6], scale: 0.5, x: 0.5, y: 0.5}
  })

  state = reducer(state, panBoard)
  t.deepEqual(state.panZoom, {
    layers: {panStart: [0.4, 0.5], scale: 0.5, x: 0.7, y: 0.7},
    board: {panStart: [0.4, 0.5], scale: 0.5, x: 0.4, y: 0.4}
  })
})

test('it should be able to handle DISCRETE_PAN', (t) => {
  const panUpBoard = {type: action.DISCRETE_PAN, view: 'board', direction: 'up'}
  const panDownLayers = {type: action.DISCRETE_PAN, view: 'layers', direction: 'down'}
  const panLeftBoard = {type: action.DISCRETE_PAN, view: 'board', direction: 'left'}
  const panRightLayers = {type: action.DISCRETE_PAN, view: 'layers', direction: 'right'}
  let state = PAN_ZOOM_TEST_STATE

  const increment = 0.5 + PAN_DISCRETE_AMOUNT
  const decrement = 0.5 - PAN_DISCRETE_AMOUNT

  state = reducer(state, panUpBoard)
  t.deepEqual(state.panZoom, {
    layers: {panStart: null, scale: 0.5, x: 0.5, y: 0.5},
    board: {panStart: null, scale: 0.5, x: 0.5, y: increment}
  })

  state = reducer(state, panDownLayers)
  t.deepEqual(state.panZoom, {
    layers: {panStart: null, scale: 0.5, x: 0.5, y: decrement},
    board: {panStart: null, scale: 0.5, x: 0.5, y: increment}
  })

  state = reducer(state, panLeftBoard)
  t.deepEqual(state.panZoom, {
    layers: {panStart: null, scale: 0.5, x: 0.5, y: decrement},
    board: {panStart: null, scale: 0.5, x: increment, y: increment}
  })

  state = reducer(state, panRightLayers)
  t.deepEqual(state.panZoom, {
    layers: {panStart: null, scale: 0.5, x: decrement, y: decrement},
    board: {panStart: null, scale: 0.5, x: increment, y: increment}
  })
})

test('it should be able to handle a ZOOM_TO action', (t) => {
  const zoomLayers = {type: action.ZOOM_TO, view: 'layers', zoom: 0.4}
  const zoomBoard = {type: action.ZOOM_TO, view: 'board', zoom: 0.6}
  let state = PAN_ZOOM_TEST_STATE

  state = reducer(state, zoomLayers)
  t.deepEqual(state.panZoom, {
    layers: {panStart: null, scale: 0.4, x: 0.5, y: 0.5},
    board: {panStart: null, scale: 0.5, x: 0.5, y: 0.5}
  })

  state = reducer(state, zoomBoard)
  t.deepEqual(state.panZoom, {
    layers: {panStart: null, scale: 0.4, x: 0.5, y: 0.5},
    board: {panStart: null, scale: 0.6, x: 0.5, y: 0.5}
  })
})

test('it should be able to handle an layer.ADD action', (t) => {
  const addAction = {type: layerAction.ADD, id: 'foo'}
  const state = reducer(EXPECTED_INITIAL_STATE, addAction)

  t.deepEqual(state.layers, {foo: {showSettings: false}})
})

test('it should be able to handle a layer.REMOVE action', (t) => {
  const removeAction = {type: layerAction.REMOVE, id: 'bar'}
  let state = Object.assign({}, EXPECTED_INITIAL_STATE, {
    layers: {
      bar: {showSettings: false}
    }
  })

  state = reducer(state, removeAction)
  t.deepEqual(state.layers, {})
})

test('it shoud be able to handle a TOGGLE_LAYER_SETTINGS action', (t) => {
  const toggleAction = {type: action.TOGGLE_LAYER_SETTINGS, id: 'foo'}
  let state = Object.assign({}, EXPECTED_INITIAL_STATE, {
    layers: {
      foo: {showSettings: false}
    }
  })

  state = reducer(state, toggleAction)
  t.deepEqual(state.layers, {foo: {showSettings: true}})

  state = reducer(state, toggleAction)
  t.deepEqual(state.layers, {foo: {showSettings: false}})
})
