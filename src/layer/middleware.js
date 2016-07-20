// layer middleware
'use strict'

const shortId = require('shortid')
const randomColor = require('randomcolor')

module.exports = {
  uniqueId() {
    return () => (next) => (action) => {
      if (action.meta && action.meta.uniqueId) {
        const id = shortId.generate()

        return next(Object.assign({}, action, {id}))
      }

      next(action)
    }
  },

  randomColor() {
    return () => (next) => (action) => {
      if (action.meta && action.meta.randomColor) {
        const color = randomColor({luminosity: 'dark'})

        return next(Object.assign({}, action, {color}))
      }

      next(action)
    }
  }
}
