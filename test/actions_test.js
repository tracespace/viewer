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
      board: 3
    })
  })

  it('should be able to set a render of a board', () => {
    expect(actions.SET_BOARD_RENDER).to.equal('SET_BOARD_RENDER')
    expect(actions.setBoardRender(2, 'top', '<svg></svg>')).to.eql({
      type: 'SET_BOARD_RENDER',
      board: 2,
      side: 'top',
      render: '<svg></svg>'
    })
  })

  it('should be able to add a layer to a board', () => {
    expect(actions.ADD_LAYER).to.equal('ADD_LAYER')
    expect(actions.addLayer(2, 'something.gbr')).to.eql({
      type: 'ADD_LAYER',
      board: 2,
      name: 'something.gbr'
    })
  })

  it('should be able to remove a layer from a board', () => {
    expect(actions.REMOVE_LAYER).to.equal('REMOVE_LAYER')
    expect(actions.removeLayer(5, 3)).to.eql({
      type: 'REMOVE_LAYER',
      board: 5,
      layer: 3
    })
  })

  it("should be able to set a layer's type", () => {
    expect(actions.SET_LAYER_TYPE).to.equal('SET_LAYER_TYPE')
    expect(actions.setLayerType(2, 4, 'tcu')).to.eql({
      type: 'SET_LAYER_TYPE',
      board: 2,
      layer: 4,
      layerType: 'tcu'
    })
  })

  it('should be able to set a render of a layer', () => {
    expect(actions.SET_LAYER_RENDER).to.equal('SET_LAYER_RENDER')
    expect(actions.setLayerRender(2, 5, '<svg></svg>')).to.eql({
      type: 'SET_LAYER_RENDER',
      board: 2,
      layer: 5,
      render: '<svg></svg>'
    })
  })
})
