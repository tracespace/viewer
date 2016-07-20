// layer selector test
'use strict'

const test = require('ava')

const reducer = require('../../src/layer/reducer')
const selector = require('../../src/layer/selector')

const SELECTOR_TEST_STATE_MM = {
  [reducer.NAME]: {
    ids: ['foo', 'bar', 'baz', 'qux'],
    byId: {
      foo: {id: 'foo', isVisible: true, render: {units: 'mm', viewBox: [0, 1, 2, 3]}},
      bar: {id: 'bar', isVisible: true, render: {units: 'mm', viewBox: [-1, 0, 1, 2]}},
      baz: {id: 'baz', isVisible: false},
      qux: {id: 'qux', isVisible: false, render: {units: 'in', viewBox: [-2, -1, 0, 1]}}
    }
  }
}

const SELECTOR_TEST_STATE_IN = {
  [reducer.NAME]: {
    ids: ['foo', 'bar', 'baz'],
    byId: {
      foo: {id: 'foo', isVisible: true, render: {units: 'in', viewBox: [0, 1, 2, 3]}},
      bar: {id: 'bar', isVisible: true, render: {units: 'in', viewBox: [-1, 0, 1, 2]}},
      baz: {id: 'baz', isVisible: false, render: {units: 'mm', viewBox: [-508, -254, 0, 254]}}
    }
  }
}

test('it should be able to get all layers', (assert) => {
  assert.deepEqual(selector.getLayers(SELECTOR_TEST_STATE_MM), [
    {id: 'foo', isVisible: true, render: {units: 'mm', viewBox: [0, 1, 2, 3]}},
    {id: 'bar', isVisible: true, render: {units: 'mm', viewBox: [-1, 0, 1, 2]}},
    {id: 'baz', isVisible: false},
    {id: 'qux', isVisible: false, render: {units: 'in', viewBox: [-2, -1, 0, 1]}}
  ])
})

test('it should be able to get rendered layers', (assert) => {
  assert.deepEqual(selector.getRenderedLayers(SELECTOR_TEST_STATE_MM), [
    {id: 'foo', isVisible: true, render: {units: 'mm', viewBox: [0, 1, 2, 3]}},
    {id: 'bar', isVisible: true, render: {units: 'mm', viewBox: [-1, 0, 1, 2]}},
    {id: 'qux', isVisible: false, render: {units: 'in', viewBox: [-2, -1, 0, 1]}}
  ])
})

test('it should be able to get renders', (assert) => {
  assert.deepEqual(selector.getRenders(SELECTOR_TEST_STATE_MM), [
    {id: 'foo', units: 'mm', viewBox: [0, 1, 2, 3]},
    {id: 'bar', units: 'mm', viewBox: [-1, 0, 1, 2]},
    {id: 'qux', units: 'in', viewBox: [-2, -1, 0, 1]}
  ])
})

test('it should be able to get the units', (assert) => {
  assert.is(selector.getUnits(SELECTOR_TEST_STATE_MM), 'mm')
  assert.is(selector.getUnits(SELECTOR_TEST_STATE_IN), 'in')
})

test('it should be able to get and scale viewboxes', (assert) => {
  assert.deepEqual(selector.getViewboxes(SELECTOR_TEST_STATE_MM), [
    [0, 1, 2, 3],
    [-1, 0, 1, 2],
    [-50.8, -25.4, 0, 25.4]
  ])

  assert.deepEqual(selector.getViewboxes(SELECTOR_TEST_STATE_IN), [
    [0, 1, 2, 3],
    [-1, 0, 1, 2],
    [-20, -10, 0, 10]
  ])
})

test('it should be able to get the total viewbox', (assert) => {
  const resultMm = selector.getTotalViewbox(SELECTOR_TEST_STATE_MM)
  const resultIn = selector.getTotalViewbox(SELECTOR_TEST_STATE_IN)

  assert.deepEqual(resultMm, [-50.8, -25.4, 52.8, 29.4])
  assert.deepEqual(resultIn, [-20, -10, 22, 14])
})
