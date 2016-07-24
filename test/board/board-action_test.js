// board action test suite
'use strict'

const test = require('ava')

const action = require('../../src/board/action')

test('it should be able to set maskWithOutline', (t) => {
  const maskOff = action.maskWithOutline(false)
  const maskOn = action.maskWithOutline(true)

  t.deepEqual(maskOff, {type: 'board:MASK_WITH_OUTLINE', mask: false})
  t.deepEqual(maskOn, {type: 'board:MASK_WITH_OUTLINE', mask: true})
})

test('it should be able to set colors', (t) => {
  const setCopper = action.setColor('cu', '#ddd')

  t.deepEqual(setCopper, {
    type: 'board:SET_COLOR',
    target: 'cu',
    color: '#ddd'
  })
})
