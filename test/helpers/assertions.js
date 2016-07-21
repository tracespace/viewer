// custom assertion helpers
'use strict'

const hasClassName = require('amp-has-class')

module.exports = {
  hasClass(t, element, ...classes) {
    classes.forEach((className) => {
      t.true(hasClassName(element, className))
    })
  },

  notHasClass(t, element, ...classes) {
    classes.forEach((className) => {
      t.false(hasClassName(element, className))
    })
  }
}
