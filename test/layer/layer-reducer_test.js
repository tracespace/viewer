// layer reducer tests
'use strict'

const test = require('ava')

const action = require('../../src/layer/action')
const reducer = require('../../src/layer/reducer')

const EXPECTED_INITIAL_STATE = {
  ids: [],
  byId: {}
}

test('it should have the correct namespace', (assert) => {
  assert.is(reducer.NAME, 'layer')
})

test('it should have the correct initial state', (assert) => {
  const result = reducer(undefined, {})

  assert.deepEqual(result, EXPECTED_INITIAL_STATE)
})

test('it should handle ADD_LAYER', (assert) => {
  const add1 = {
    type: action.ADD,
    id: 'foo',
    color: '#000',
    file: {name: 'hello'}
  }

  const add2 = {
    type: action.ADD,
    id: 'bar',
    color: '#000',
    file: {name: "it's me"}
  }

  let state = EXPECTED_INITIAL_STATE

  state = reducer(state, add1)
  assert.deepEqual(state, {
    ids: ['foo'],
    byId: {
      foo: {id: 'foo', filename: 'hello', color: '#000', isVisible: true}
    }
  })

  state = reducer(state, add2)
  assert.deepEqual(state, {
    ids: ['foo', 'bar'],
    byId: {
      foo: {id: 'foo', filename: 'hello', color: '#000', isVisible: true},
      bar: {id: 'bar', filename: "it's me", color: '#000', isVisible: true}
    }
  })
})

test('it should update if ADD_LAYER sent with a duplicate id', (assert) => {
  const add = {
    type: action.ADD,
    id: 'foo',
    color: '#000',
    file: {name: 'hello'}
  }

  let state = {
    ids: ['foo'],
    byId: {
      foo: {id: 'foo'}
    }
  }

  state = reducer(state, add)
  assert.deepEqual(state, {
    ids: ['foo'],
    byId: {
      foo: {id: 'foo', filename: 'hello', color: '#000', isVisible: true}
    }
  })
})

test('it should handle REMOVE_LAYER', (assert) => {
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
  assert.deepEqual(state, {
    ids: ['bar'],
    byId: {
      'bar': {id: 'bar'}
    }
  })

  state = reducer(state, remove2)
  assert.deepEqual(state, EXPECTED_INITIAL_STATE)
})

test('it should handle START_RENDER', (assert) => {
  const startWithoutType = {
    type: action.START_RENDER,
    id: 'foo'
  }

  const startWithType = {
    type: action.START_RENDER,
    id: 'bar',
    layerType: 'drw'
  }

  let state = {
    ids: ['foo', 'bar'],
    byId: {
      foo: {id: 'foo', render: {}, layerType: 'tcu'},
      bar: {id: 'bar'}
    }
  }

  state = reducer(state, startWithoutType)

  assert.deepEqual(state, {
    ids: ['foo', 'bar'],
    byId: {
      foo: {id: 'foo', layerType: 'tcu', isRendering: true},
      bar: {id: 'bar'}
    }
  })

  state = reducer(state, startWithType)
  assert.deepEqual(state, {
    ids: ['foo', 'bar'],
    byId: {
      foo: {id: 'foo', layerType: 'tcu', isRendering: true},
      bar: {id: 'bar', layerType: 'drw', isRendering: true}
    }
  })
})

test('it should handle FINISH_RENDER', (assert) => {
  const finish = {
    type: action.FINISH_RENDER,
    id: 'foo',
    conversionOpts: {baz: 'quux'},
    render: {foo: 'bar'}
  }

  let state = {
    ids: ['foo'],
    byId: {
      foo: {id: 'foo', isRendering: true}
    }
  }

  state = reducer(state, finish)
  assert.deepEqual(state, {
    ids: ['foo'],
    byId: {
      foo: {
        id: 'foo',
        isRendering: false,
        render: {foo: 'bar'},
        conversionOpts: {baz: 'quux'}
      }
    }
  })
})

test('it should handle TOGGLE_VISIBILITY', (assert) => {
  const set = {type: action.TOGGLE_VISIBILITY, id: 'bar'}
  let state = {
    ids: ['foo', 'bar'],
    byId: {
      foo: {id: 'foo', isVisible: true},
      bar: {id: 'bar', isVisible: true}
    }
  }

  state = reducer(state, set)
  assert.deepEqual(state, {
    ids: ['foo', 'bar'],
    byId: {
      foo: {id: 'foo', isVisible: true},
      bar: {id: 'bar', isVisible: false}
    }
  })

  state = reducer(state, set)
  assert.deepEqual(state, {
    ids: ['foo', 'bar'],
    byId: {
      foo: {id: 'foo', isVisible: true},
      bar: {id: 'bar', isVisible: true}
    }
  })
})

test('it should handle SET_CONVERSION_OPTS', (assert) => {
  const set = {
    type: action.SET_CONVERSION_OPTS,
    id: 'foo',
    conversionOpts: {baz: 'quux'},
    meta: {convert: true}
  }

  let state = {
    ids: ['foo', 'bar'],
    byId: {
      foo: {id: 'foo', conversionOpts: {}},
      bar: {id: 'bar', conversionOpts: {}}
    }
  }

  state = reducer(state, set)
  assert.deepEqual(state, {
    ids: ['foo', 'bar'],
    byId: {
      foo: {id: 'foo', conversionOpts: {baz: 'quux'}},
      bar: {id: 'bar', conversionOpts: {}}
    }
  })
})

test('it should handle SET_TYPE', (assert) => {
  const set = {
    type: action.SET_TYPE,
    id: 'bar',
    layerType: 'bsm'
  }

  let state = {
    ids: ['foo', 'bar'],
    byId: {
      foo: {id: 'foo', layerType: 'bcu'},
      bar: {id: 'bar', layerType: 'tcu'}
    }
  }

  state = reducer(state, set)
  assert.deepEqual(state, {
    ids: ['foo', 'bar'],
    byId: {
      foo: {id: 'foo', layerType: 'bcu'},
      bar: {id: 'bar', layerType: 'bsm'}
    }
  })
})

test('it should handle SET_COLOR', (assert) => {
  const set = {
    type: action.SET_COLOR,
    id: 'foo',
    color: '#000'
  }

  let state = {
    ids: ['foo', 'bar'],
    byId: {
      foo: {id: 'foo', color: '#fff'},
      bar: {id: 'bar', color: '#fff'}
    }
  }

  state = reducer(state, set)
  assert.deepEqual(state, {
    ids: ['foo', 'bar'],
    byId: {
      foo: {id: 'foo', color: '#000'},
      bar: {id: 'bar', color: '#fff'}
    }
  })
})
