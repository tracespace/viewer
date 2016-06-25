// layer module test
import shortId from 'shortid'
import {expect} from 'chai'

import * as action from '../src/layer/action'
import reducer, {NAME} from '../src/layer/reducer'
import * as selector from '../src/layer/selector'

describe('layer', function() {
  it('should have the correct namespace', function() {
    expect(NAME).to.equal('layer')
  })

  describe('actions', function() {
    it('should be able to add a layer', function() {
      const file = {}
      const result = action.add(file)

      expect(result).to.have.all.keys('type', 'id', 'file', 'color', 'meta')
      expect(result.type).to.equal(action.ADD)
      expect(shortId.isValid(result.id)).to.be.true
      expect(result.file).to.equal(file)
      expect(result.meta).to.eql({convert: true})
    })

    it('should be able to remove a layer', function() {
      const result = action.remove('some-id')
      const expected = {type: action.REMOVE, id: 'some-id'}

      expect(result).to.eql(expected)
    })

    it('should be able to start a render', function() {
      const result = action.startRender('some-id', {foo: 'bar'}, {baz: 'quux'})
      const expected = {
        type: action.START_RENDER,
        id: 'some-id',
        layerType: {foo: 'bar'},
        conversionOpts: {baz: 'quux'}
      }

      expect(result).to.eql(expected)
    })

    it('should be able to finish a render', function() {
      const id = 'some-id'
      const render = {baz: 'quux'}
      const error = {some: 'optional error'}
      const result = action.finishRender(id, render, error)
      const expected = {type: action.FINISH_RENDER, id, render, error}

      expect(result).to.eql(expected)
    })

    it('should be able to toggle the layer visibility', function() {
      const id = 'some-id'
      const result = action.toggleVisibility(id)
      const expected = {type: action.TOGGLE_VISIBILITY, id}

      expect(result).to.eql(expected)
    })


    it('should be able to set the conversion options', function() {
      const id = 'some-id'
      const layerType = 'tcu'
      const conversionOpts = {foo: 'bar'}
      const result = action.setConversionOpts(id, layerType, conversionOpts)
      const expected = {
        type: action.SET_CONVERSION_OPTS,
        id,
        layerType,
        conversionOpts,
        meta: {convert: true}
      }

      expect(result).to.eql(expected)
    })

    it('should be able to set the color', function() {
      const id = 'some-id'
      const color = 'rgb(100, 150, 50)'
      const result = action.setColor(id, color)
      const expected = {type: action.SET_COLOR, id, color}

      expect(result).to.eql(expected)
    })
  })

  describe('reducers', function() {
    const initialState = reducer(undefined, {})

    it('should return the initial state', function() {
      expect(initialState).to.eql({
        ids: [],
        byId: {}
      })
    })

    it('should handle ADD_LAYER', function() {
      const add1 = {type: action.ADD, id: 'foo', color: '#000', file: {name: 'hello'}}
      const add2 = {type: action.ADD, id: 'bar', color: '#000', file: {name: "it's me"}}
      let state = initialState

      state = reducer(state, add1)
      expect(state).to.eql({
        ids: ['foo'],
        byId: {
          foo: {id: 'foo', filename: 'hello', color: '#000', isVisible: true}
        }
      })

      state = reducer(state, add2)
      expect(state).to.eql({
        ids: ['foo', 'bar'],
        byId: {
          foo: {id: 'foo', filename: 'hello', color: '#000', isVisible: true},
          bar: {id: 'bar', filename: "it's me", color: '#000', isVisible: true}
        }
      })
    })

    it('should handle REMOVE_LAYER', function() {
      const remove1 = {type: action.REMOVE, id: 'foo'}
      const remove2 = {type: action.REMOVE, id: 'bar'}
      let state = {
        ids: ['foo', 'bar'],
        byId: {
          foo: {id: 'foo'},
          bar: {id: 'bar'}
        }
      }

      state = reducer(state, remove1)
      expect(state).to.eql({
        ids: ['bar'],
        byId: {
          'bar': {id: 'bar'}
        }
      })

      state = reducer(state, remove2)
      expect(state).to.eql(initialState)
    })

    it('should handle START_RENDER', function() {
      const start = {
        type: action.START_RENDER,
        id: 'foo',
        layerType: {foo: 'bar'},
        conversionOpts: {baz: 'quux'}
      }

      let state = {
        ids: ['foo'],
        byId: {
          foo: {id: 'foo', render: {}}
        }
      }

      state = reducer(state, start)
      expect(state).to.eql({
        ids: ['foo'],
        byId: {
          foo: {
            id: 'foo',
            isRendering: true,
            layerType: {foo: 'bar'},
            conversionOpts: {baz: 'quux'}
          }
        }
      })
    })

    it('should handle FINISH_RENDER', function() {
      const finish = {type: action.FINISH_RENDER, id: 'foo', render: {foo: 'bar'}}
      let state = {
        ids: ['foo'],
        byId: {
          foo: {id: 'foo', isRendering: true}
        }
      }

      state = reducer(state, finish)
      expect(state).to.eql({
        ids: ['foo'],
        byId: {
          foo: {id: 'foo', isRendering: false, render: {foo: 'bar'}}
        }
      })
    })

    it('should handle TOGGLE_VISIBILITY', function() {
      const set = {type: action.TOGGLE_VISIBILITY, id: 'bar'}
      let state = {
        ids: ['foo', 'bar'],
        byId: {
          foo: {id: 'foo', isVisible: true},
          bar: {id: 'bar', isVisible: true}
        }
      }

      state = reducer(state, set)
      expect(state).to.eql({
        ids: ['foo', 'bar'],
        byId: {
          foo: {id: 'foo', isVisible: true},
          bar: {id: 'bar', isVisible: false}
        }
      })

      state = reducer(state, set)
      expect(state).to.eql({
        ids: ['foo', 'bar'],
        byId: {
          foo: {id: 'foo', isVisible: true},
          bar: {id: 'bar', isVisible: true}
        }
      })
    })

    it('should handle SET_CONVERSION_OPTS', function() {
      const set = {
        type: action.SET_CONVERSION_OPTS,
        id: 'foo',
        layerType: 'drl',
        conversionOpts: {baz: 'quux'},
        meta: {convert: true}
      }
      let state = {
        ids: ['foo', 'bar'],
        byId: {
          foo: {id: 'foo', layerType: 'tcu', conversionOpts: {}},
          bar: {id: 'bar', layerType: 'tcu', conversionOpts: {}}
        }
      }

      state = reducer(state, set)
      expect(state).to.eql({
        ids: ['foo', 'bar'],
        byId: {
          foo: {id: 'foo', layerType: 'drl', conversionOpts: {baz: 'quux'}},
          bar: {id: 'bar', layerType: 'tcu', conversionOpts: {}}
        }
      })
    })

    it('should handle SET_COLOR', function() {
      const set = action.setColor('foo', '#000')
      let state = {
        ids: ['foo', 'bar'],
        byId: {
          foo: {id: 'foo', color: '#fff'},
          bar: {id: 'bar', color: '#fff'}
        }
      }

      state = reducer(state, set)
      expect(state).to.eql({
        ids: ['foo', 'bar'],
        byId: {
          foo: {id: 'foo', color: '#000'},
          bar: {id: 'bar', color: '#fff'}
        }
      })
    })
  })

  describe('selectors', function() {
    it('should be able to get all layers', function() {
      const state = {
        [NAME]: {
          ids: ['foo', 'bar', 'baz'],
          byId: {
            foo: {id: 'foo'},
            bar: {id: 'bar'},
            baz: {id: 'baz'}
          }
        }
      }
      const result = selector.getLayers(state)

      expect(result).to.eql([
        {id: 'foo'},
        {id: 'bar'},
        {id: 'baz'}
      ])
    })

    it('should be able to get visible layers', function() {
      const state = {
        [NAME]: {
          ids: ['foo', 'bar', 'baz', 'quux'],
          byId: {
            foo: {id: 'foo', isVisible: true, render: {hello: "it's me"}},
            bar: {id: 'bar', isVisible: true},
            baz: {id: 'baz', isVisible: false},
            quux: {id: 'quux', isVisible: false, render: {hello: 'from the other side'}}
          }
        }
      }
      const result = selector.getRenderedLayers(state)

      expect(result).to.eql([
        {id: 'foo', isVisible: true, render: {hello: "it's me"}},
        {id: 'quux', isVisible: false, render: {hello: 'from the other side'}}
      ])
    })
  })

  describe('components', function() {

  })
})
