// app selector test
'use strict'

const test = require('ava')

const reducer = require('../../src/app/reducer')
const selector = require('../../src/app/selector')

const SELECTOR_TEST_STATE_LAYERS = {
  [reducer.NAME]: {
    view: 'layers',
    panZoom: {
      layers: {panStart: null, scale: 0.1, x: 0.2, y: 0.3},
      board: {panStart: null, scale: 0.4, x: 0.6, y: 0.7}
    },
    layers: {
      foo: {showSettings: false},
      bar: {showSettings: true}
    }
  }
}

const SELECTOR_TEST_STATE_BOARD = {
  [reducer.NAME]: {
    view: 'board',
    panZoom: {
      layers: {panStart: null, scale: 0.1, x: 0.2, y: 0.3},
      board: {panStart: null, scale: 0.4, x: 0.6, y: 0.7}
    },
    layers: {
      foo: {showSettings: false},
      bar: {showSettings: true}
    }
  }
}
test('it should be able to get the layer display states', (assert) => {
  const displayStates = selector.getLayerDisplayStates(SELECTOR_TEST_STATE_LAYERS)

  assert.deepEqual(displayStates, {
    foo: {showSettings: false},
    bar: {showSettings: true}
  })
})

test('it should be able to get the selected view', (assert) => {
  const viewLayers = selector.getSelectedView(SELECTOR_TEST_STATE_LAYERS)
  const viewBoard = selector.getSelectedView(SELECTOR_TEST_STATE_BOARD)

  assert.is(viewLayers, 'layers')
  assert.is(viewBoard, 'board')
})

test('it should be able to get the selected view pan zoom', (assert) => {
  const panZoomLayers = selector.getSelectedPanZoom(SELECTOR_TEST_STATE_LAYERS)
  const panZoomBoard = selector.getSelectedPanZoom(SELECTOR_TEST_STATE_BOARD)

  assert.deepEqual(panZoomLayers, {panStart: null, scale: 0.1, x: 0.2, y: 0.3})
  assert.deepEqual(panZoomBoard, {panStart: null, scale: 0.4, x: 0.6, y: 0.7})
})
