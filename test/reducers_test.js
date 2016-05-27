// test suite for reducers

import {expect} from 'chai'
import * as actions from '../src/actions'
import * as reducers from '../src/reducers'

describe('reducers', () => {
  describe('board reducers', () => {
    let oldState
    const reducer = reducers.boards

    beforeEach(() => {
      oldState = []
    })

    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.eql([])
    })

    it('should add a board', () => {
      const action = actions.addBoard('a new board')
      const newState = reducer(oldState, action)

      expect(newState).to.eql([
        {name: 'a new board', renders: {top: '', bottom: ''}, layers: []}
      ])
      expect(newState).to.not.equal(oldState)
    })

    it('should remove a board', () => {
      oldState = [
        {name: 'board 0', renders: {top: '', bottom: ''}, layers: []},
        {name: 'board 1', renders: {top: '', bottom: ''}, layers: []},
        {name: 'board 2', renders: {top: '', bottom: ''}, layers: []}
      ]
      const action = actions.removeBoard(1)
      const newState = reducer(oldState, action)

      expect(newState).to.eql([
        {name: 'board 0', renders: {top: '', bottom: ''}, layers: []},
        {name: 'board 2', renders: {top: '', bottom: ''}, layers: []}
      ])
      expect(newState).to.not.equal(oldState)
    })
  })
})
