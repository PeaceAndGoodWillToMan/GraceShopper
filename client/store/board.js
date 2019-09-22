import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ALL_BOARDS = 'GOT_ALL_BOARDS'
const GOT_SINGLE_BOARD = 'GOT_SINGLE_BOARD'

/**
 * ACTION CREATORS
 */
const gotAllBoards = boards => ({type: GOT_ALL_BOARDS, boards})
const gotSingleBoard = board => ({
  type: GOT_SINGLE_BOARD,
  board
})

/**
 * THUNK CREATORS
 */
export const getAllBoards = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/boards')
      dispatch(gotAllBoards(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const getSingleBoard = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/boards/${id}`)
      dispatch(gotSingleBoard(data))
    } catch (err) {
      console.log(err)
    }
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  all: [],
  selected: {}
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_BOARDS:
      return {...state, all: action.boards}
    case GOT_SINGLE_BOARD:
      return {...state, selected: action.board}
    default:
      return state
  }
}
