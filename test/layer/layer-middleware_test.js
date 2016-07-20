// layer middleware tests
'use strict'

const test = require('ava')
const shortId = require('shortid')
const sinon = require('sinon')

const middleware = require('../../src/layer/middleware')

test('it should add an id to an action given meta.uniqueId', (assert) => {
  const next = sinon.stub()
  const action = {foo: 'bar', meta: {uniqueId: true}}
  const handler = middleware.uniqueId()()(next)

  handler(action)
  assert.true(next.calledOnce)

  const result = next.firstCall.args[0]

  assert.true(shortId.isValid(result.id))
  assert.deepEqual(result, Object.assign({id: result.id}, action))
})

test('it should not add an id to an action without meta.uniqueId', (assert) => {
  const next = sinon.stub()
  const action = {foo: 'bar'}
  const handler = middleware.uniqueId()()(next)

  handler(action)
  assert.true(next.calledOnce)
  assert.is(next.firstCall.args[0], action)
})

test('it should add a color to an action given meta.randomColor', (assert) => {
  const next = sinon.stub()
  const action = {foo: 'bar', meta: {randomColor: true}}
  const handler = middleware.randomColor()()(next)

  handler(action)
  assert.true(next.calledOnce)

  const result = next.firstCall.args[0]

  assert.regex(result.color, /^#[a-z0-9]{6}$/i)
  assert.deepEqual(result, Object.assign({color: result.color}, action))
})

test('it should not add color to an action without meta.randomColor', (assert) => {
  const next = sinon.stub()
  const action = {foo: 'bar'}
  const handler = middleware.randomColor()()(next)

  handler(action)
  assert.true(next.calledOnce)
  assert.is(next.firstCall.args[0], action)
})
