// board reducer test suite
'use strict'

const test = require('ava')

const action = require('../../src/board/action')
const reducer = require('../../src/board/reducer')

const EXPECTED_INITIAL_STATE = {
  maskWithOutline: true,
  color: {
    fr4: '#666',
    cu: '#ccc',
    cf: '#c93',
    sm: 'rgba(0, 66, 0, 0.75)',
    ss: '#fff',
    sp: '#999',
    out: '#000'
  }
}

test('it should have the correct initial state', (t) => {
  t.deepEqual(reducer(undefined, {}), EXPECTED_INITIAL_STATE)
})

test('it should have the correct namespace', (t) => {
  t.is(reducer.NAME, 'board')
})

test('it should be able to handle a MASK_WITH_OUTLINE action', (t) => {
  const maskOff = {type: action.MASK_WITH_OUTLINE, mask: false}
  const maskOn = {type: action.MASK_WITH_OUTLINE, mask: true}
  let state = EXPECTED_INITIAL_STATE

  state = reducer(state, maskOff)
  t.deepEqual(state, {
    maskWithOutline: false,
    color: EXPECTED_INITIAL_STATE.color
  })

  state = reducer(state, maskOn)
  t.deepEqual(state, {
    maskWithOutline: true,
    color: EXPECTED_INITIAL_STATE.color
  })
})

test('should be able to handle a SET_COLOR action', (t) => {
  const setCopper = {type: action.SET_COLOR, target: 'cu', color: '#ddd'}
  const state = reducer(EXPECTED_INITIAL_STATE, setCopper)

  t.deepEqual(state, {
    maskWithOutline: EXPECTED_INITIAL_STATE.maskWithOutline,
    color: Object.assign({}, EXPECTED_INITIAL_STATE.color, {
      cu: '#ddd'
    })
  })

})
