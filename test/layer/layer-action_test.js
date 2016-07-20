// layer action tests
'use strict'

const test = require('ava')

const action = require('../../src/layer/action')

test('it should be able to add a layer', (assert) => {
  const result = action.add({foo: 'bar'})

  assert.deepEqual(result, {
    type: action.ADD,
    file: {foo: 'bar'},
    meta: {
      convert: true,
      uniqueId: true,
      randomColor: true
    }
  })
})

test('it should be able to remove a layer', (assert) => {
  const result = action.remove('some-id')

  assert.deepEqual(result, {
    type: action.REMOVE,
    id: 'some-id'
  })
})

test('it should be able to start a render', (assert) => {
  const result = action.startRender('some-id')

  assert.deepEqual(result, {
    type: action.START_RENDER,
    id: 'some-id'
  })
})

test('it should be able to start a render with a type', (assert) => {
  const result = action.startRender('some-id', 'foo')

  assert.deepEqual(result, {
    type: action.START_RENDER,
    id: 'some-id',
    layerType: 'foo'
  })
})

test('it should be able to finish a render', (assert) => {
  const id = 'some-id'
  const conversionOpts = {foo: 'bar'}
  const render = {baz: 'quux'}
  const error = {some: 'optional error'}
  const result = action.finishRender(id, conversionOpts, render, error)

  assert.deepEqual(result, {
    type: action.FINISH_RENDER,
    id,
    conversionOpts,
    render,
    error
  })
})

test('it should be able to toggle visibility', (assert) => {
  const id = 'some-id'
  const result = action.toggleVisibility(id)

  assert.deepEqual(result, {type: action.TOGGLE_VISIBILITY, id})
})

test('it should be able to set conversion opts', (assert) => {
  const id = 'some-id'
  const conversionOpts = {foo: 'bar'}
  const result = action.setConversionOpts(id, conversionOpts)

  assert.deepEqual(result, {
    type: action.SET_CONVERSION_OPTS,
    id,
    conversionOpts,
    meta: {convert: true}
  })
})

test('it should be able to set layer type', (assert) => {
  const id = 'some-id'
  const layerType = 'tcu'
  const result = action.setType(id, layerType)

  assert.deepEqual(result, {
    type: action.SET_TYPE,
    id,
    layerType
  })
})

test('it should be able to set the color', (assert) => {
  const id = 'some-id'
  const color = 'rgb(100, 150, 50)'
  const result = action.setColor(id, color)

  assert.deepEqual(result, {type: action.SET_COLOR, id, color})
})
