// store actions

export const ADD_BOARD = 'ADD_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'

export const addBoard = name => ({type: ADD_BOARD, name})
export const removeBoard = index => ({type: REMOVE_BOARD, index})
