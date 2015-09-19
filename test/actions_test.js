// test suite for actions

import {expect} from 'chai'
import * as actions from '../src/actions'

describe('actions', () => {
  it('should be able to add a board', () => {
    expect(actions.ADD_BOARD).to.equal('ADD_BOARD')
    expect(actions.addBoard('boardName')).to.eql({
      type: 'ADD_BOARD',
      name: 'boardName'
    })
  })

  it('should be able to remove a board', () => {
    expect(actions.REMOVE_BOARD).to.equal('REMOVE_BOARD')
    expect(actions.removeBoard(3)).to.eql({
      type: 'REMOVE_BOARD',
      index: 3
    })
  })
})
