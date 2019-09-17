import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ALL_BOARDS = 'GOT_ALL_BOARDS'

/**
 * INITIAL STATE
 */
const initialState = {
  all: []
}

/**
 * ACTION CREATORS
 */
const gotAllBoards = boards => ({type: GOT_ALL_BOARDS, boards})

/**
 * THUNK CREATORS
 */
export const getAllBoards = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/boards')
      dispatch(gotAllBoards(data))
    } catch (err) {
      console.log('Something went wrong!')
    }
  }
}
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_BOARDS:
      return {...state, all: action.boards}
    default:
      return state
  }
}
