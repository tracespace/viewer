// layer component tests
'use strict'

const test = require('ava')
const {h, dom} = require('deku')
const jsdom = require('jsdom')

const {hasClass, notHasClass} = require('../helpers/assertions')
const {Layer, LayerDefs, Layers} = require('../../src/layer/component')

test.cb.before((t) => {
  jsdom.env('<body></body>', (error, win) => {
    if (error) {
      return t.end(error)
    }

    global.window = win
    global.document = win.document
    t.end()
  })
})

test('it should have a Layer component that is a <use>', (t) => {
  const fooLayer = {id: 'foo', color: '#123', isVisible: true}
  const foo = dom.create(h(Layer, {layer: fooLayer}))

  t.is(foo.tagName, 'use')
  t.is(foo.getAttribute('xlink:href'), '#foo')
  t.is(foo.getAttribute('fill'), '#123')
  t.is(foo.getAttribute('stroke'), '#123')

  hasClass(t, foo, 'layer-opacity')
})

test('it should add display none class to Layer if not visible', (t) => {
  const fooLayer = {id: 'foo', color: '#123', isVisible: false}
  const barLayer = {id: 'bar', color: '#456', isVisible: true}
  const foo = dom.create(h(Layer, {layer: fooLayer}))
  const bar = dom.create(h(Layer, {layer: barLayer}))

  hasClass(t, foo, 'dn')
  notHasClass(t, bar, 'dn')
})

test('it should have a LayerDefs component that wraps layers', (t) => {
  const units = 'mm'
  const renders = [
    {id: 'foo', units: 'mm', layer: [], defs: []},
    {id: 'bar', units: 'mm', layer: [], defs: []}
  ]

  const defs = dom.create(h(LayerDefs, {units, renders}))
  const children = defs.children

  t.is(defs.tagName, 'defs')
  t.is(children.length, 2)

  const fooChild = children[0]
  const barChild = children[1]

  t.is(fooChild.tagName, 'g')
  t.is(fooChild.id, 'foo')
  t.is(barChild.tagName, 'g')
  t.is(barChild.id, 'bar')
})

test('it should scale the LayerDefs children if units do not match', (t) => {
  const rendersIn = [{id: 'in', units: 'in', layer: [], defs: []}]
  const rendersMm = [{id: 'mm', units: 'mm', layer: [], defs: []}]
  const scaleToIn = dom.create(h(LayerDefs, {units: 'in', renders: rendersMm}))
  const scaleToMm = dom.create(h(LayerDefs, {units: 'mm', renders: rendersIn}))

  const childIn = scaleToIn.children[0]
  const childMm = scaleToMm.children[0]

  t.is(childIn.getAttribute('transform'), `scale(${1 / 25.4},${1 / 25.4})`)
  t.is(childMm.getAttribute('transform'), 'scale(25.4,25.4)')
})

test('it should have a Layers component that wraps Layer elements', (t) => {
  const totalViewbox = [1, 2, 4, 3]
  const layers = [
    {id: 'foo', color: '#123', isVisible: false},
    {id: 'bar', color: '#456', isVisible: true}
  ]

  const element = dom.create(h(Layers, {layers, totalViewbox}))

  // ensure the element has the proper aspect ratio
  t.is(element.getAttribute('style'), 'padding-bottom: 75%')
  hasClass(t, element, 'relative', 'w-100', 'relative')
})

test('it should handle an empty viewbox', (t) => {
  const layers = []
  const totalViewbox = []

  const element = dom.create(h(Layers, {layers, totalViewbox}))

  t.is(element.getAttribute('style'), 'padding-bottom: 0')
})
