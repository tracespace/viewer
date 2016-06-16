// layer module test
import shortId from 'shortid'
import {expect} from 'chai'

import layer from '../src/layer'

describe('layer', function() {
  const NAME = layer.NAME
  const action = layer.action
  const reducer = layer.reducer
  const selector = layer.selector

  it('should have the correct namespace', function() {
    expect(NAME).to.equal('layer')
  })

  describe('actions', function() {
    const action = layer.action

    it('should be able to add a layer', function() {
      const file = {}
      const result = action.add(file)

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

    it('should be able to change the layer visibility', function() {
      const id = 'some-id'
      const isVisible = false
      const result = action.setVisibility(id, isVisible)
      const expected = {type: action.SET_VISIBILITY, id, isVisible}

      expect(result).to.eql(expected)
    })

    it('should be able to set the layer type', function() {
      const id = 'some-id'
      const layerType = {foo: 'bar'}
      const result = action.setType(id, layerType)
      const expected = {type: action.SET_TYPE, id, layerType}

      expect(result).to.eql(expected)
    })

    it('should be able to set the conversion options', function() {
      const id = 'some-id'
      const conversionOpts = {foo: 'bar'}
      const result = action.setConversionOpts(id, conversionOpts)
      const expected = {
        type: action.SET_CONVERSION_OPTS,
        id,
        conversionOpts,
        meta: {convert: true}
      }

      expect(result).to.eql(expected)
    })
  })

  describe('reducers', function() {
    const initialState = reducer(undefined, {})

    it('should return the initial state', function() {
      expect(initialState).to.eql({
        layers: [],
        layersById: {}
      })
    })

    it('should handle ADD_LAYER', function() {
      const add1 = {type: action.ADD, id: 'foo', file: {name: 'hello'}}
      const add2 = {type: action.ADD, id: 'bar', file: {name: "it's me"}}
      let state = initialState

      state = reducer(state, add1)
      expect(state).to.eql({
        layers: ['foo'],
        layersById: {
          foo: {id: 'foo', filename: 'hello', isVisible: true}
        }
      })

      state = reducer(state, add2)
      expect(state).to.eql({
        layers: ['foo', 'bar'],
        layersById: {
          foo: {id: 'foo', filename: 'hello', isVisible: true},
          bar: {id: 'bar', filename: "it's me", isVisible: true}
        }
      })
    })

    it('should handle REMOVE_LAYER', function() {
      const remove1 = {type: action.REMOVE, id: 'foo'}
      const remove2 = {type: action.REMOVE, id: 'bar'}
      let state = {
        layers: ['foo', 'bar'],
        layersById: {
          foo: {id: 'foo'},
          bar: {id: 'bar'}
        }
      }

      state = reducer(state, remove1)
      expect(state).to.eql({
        layers: ['bar'],
        layersById: {
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
        layers: ['foo'],
        layersById: {
          foo: {id: 'foo', render: {}}
        }
      }

      state = reducer(state, start)
      expect(state).to.eql({
        layers: ['foo'],
        layersById: {
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
        layers: ['foo'],
        layersById: {
          foo: {id: 'foo', isRendering: true}
        }
      }

      state = reducer(state, finish)
      expect(state).to.eql({
        layers: ['foo'],
        layersById: {
          foo: {id: 'foo', isRendering: false, render: {foo: 'bar'}}
        }
      })
    })

    it('should handle SET_VISIBILITY', function() {
      const set = {type: action.SET_VISIBILITY, id: 'bar', isVisible: false}
      let state = {
        layers: ['foo', 'bar'],
        layersById: {
          foo: {id: 'foo', isVisible: true},
          bar: {id: 'bar', isVisible: true}
        }
      }

      state = reducer(state, set)
      expect(state).to.eql({
        layers: ['foo', 'bar'],
        layersById: {
          foo: {id: 'foo', isVisible: true},
          bar: {id: 'bar', isVisible: false}
        }
      })
    })

    it('should handle SET_TYPE', function() {
      const set = {type: action.SET_TYPE, id: 'bar', layerType: {foo: 'bar'}}
      let state = {
        layers: ['foo', 'bar'],
        layersById: {
          foo: {id: 'foo', layerType: {}},
          bar: {id: 'bar', layerType: {}}
        }
      }

      state = reducer(state, set)
      expect(state).to.eql({
        layers: ['foo', 'bar'],
        layersById: {
          foo: {id: 'foo', layerType: {}},
          bar: {id: 'bar', layerType: {foo: 'bar'}}
        }
      })
    })

    it('should handle SET_CONVERSION_OPTS', function() {
      const set = {
        type: action.SET_CONVERSION_OPTS,
        id: 'foo',
        conversionOpts: {baz: 'quux'},
        meta: {convert: true}
      }
      let state = {
        layers: ['foo', 'bar'],
        layersById: {
          foo: {id: 'foo', conversionOpts: {}},
          bar: {id: 'bar', conversionOpts: {}}
        }
      }

      state = reducer(state, set)
      expect(state).to.eql({
        layers: ['foo', 'bar'],
        layersById: {
          foo: {id: 'foo', conversionOpts: {baz: 'quux'}},
          bar: {id: 'bar', conversionOpts: {}}
        }
      })
    })
  })

  describe('selectors', function() {
    it('should be able to get all layers', function() {
      const state = {
        [NAME]: {
          layers: ['foo', 'bar', 'baz'],
          layersById: {
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
          layers: ['foo', 'bar', 'baz', 'quux'],
          layersById: {
            foo: {id: 'foo', isVisible: true, render: {hello: "it's me"}},
            bar: {id: 'bar', isVisible: true},
            baz: {id: 'baz', isVisible: false},
            quux: {id: 'quux', isVisible: true, render: {hello: 'from the other side'}}
          }
        }
      }
      const result = selector.getVisibleLayers(state)

      expect(result).to.eql([
        {id: 'foo', isVisible: true, render: {hello: "it's me"}},
        {id: 'quux', isVisible: true, render: {hello: 'from the other side'}}
      ])
    })
  })

  describe('components', function() {

  })
})
