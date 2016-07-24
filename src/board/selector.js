// board selectors
'use strict'

const {NAME} = require('./reducer')

const getBoard = (state) => state[NAME]

module.exports = {
  getBoard
}
