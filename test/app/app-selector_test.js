// app selector test
'use strict'

const test = require('ava')

const reducer = require('../../src/app/reducer')
const selector = require('../../src/app/selector')

const SELECTOR_TEST_STATE_LAYERS = {
  [reducer.NAME]: {
    view: 'layers',
    windowSize: {width: 1024, height: 768},
    panZoom: {
      windowSize: {width: 1024, height: 768},
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
      windowSize: {width: 1024, height: 768},
      layers: {panStart: null, scale: 0.1, x: 0.2, y: 0.3},
      board: {panStart: null, scale: 0.4, x: 0.6, y: 0.7}
    },
    layers: {
      foo: {showSettings: false},
      bar: {showSettings: true}
    }
  }
}
test('it should be able to get the layer display states', (t) => {
  const displayStates = selector.getLayerDisplayStates(SELECTOR_TEST_STATE_LAYERS)

  t.deepEqual(displayStates, {
    foo: {showSettings: false},
    bar: {showSettings: true}
  })
})

test('it should be able to get the selected view', (t) => {
  const viewLayers = selector.getSelectedView(SELECTOR_TEST_STATE_LAYERS)
  const viewBoard = selector.getSelectedView(SELECTOR_TEST_STATE_BOARD)

  t.is(viewLayers, 'layers')
  t.is(viewBoard, 'board')
})

test('it should be able to get the selected view pan zoom', (t) => {
  const panZoomLayers = selector.getSelectedPanZoom(SELECTOR_TEST_STATE_LAYERS)
  const panZoomBoard = selector.getSelectedPanZoom(SELECTOR_TEST_STATE_BOARD)

  t.deepEqual(panZoomLayers, {panStart: null, scale: 0.1, x: 0.2, y: 0.3})
  t.deepEqual(panZoomBoard, {panStart: null, scale: 0.4, x: 0.6, y: 0.7})
})

test('it should be able to get the window aspect ratio', (t) => {
  const aspect = selector.getWindowAspect(SELECTOR_TEST_STATE_LAYERS)

  t.is(aspect, 1024 / 768)
})
