import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CART = 'GOT_CART'
const myStorage = window.localStorage

/**
 * INITIAL STATE
 */
const initialState = {
  contents: []
}

/**
 * ACTION CREATORS
 */
const gotCart = contents => ({type: GOT_CART, contents})

/**
 * THUNK CREATORS
 */
export const gotContents = () => {
  return dispatch => {
    try {
      let arr = []
      for (const key in myStorage) {
        if (myStorage.hasOwnProperty(key)) {
          arr.push({
            id: JSON.parse(key).id,
            quantity: JSON.parse(myStorage[key]).quantity,
            price: JSON.parse(myStorage[key]).price
          })
        }
      }
      // const {data: allBoards} = await axios.get('/api/boards')
      // dispatch(gotCart(data))
      dispatch(gotCart(arr))
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
    case GOT_CART:
      return {...state, contents: action.contents}
    default:
      return state
  }
}
