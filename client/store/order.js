import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ALL_ORDERS = 'GOT_ALL_ORDERS'

/**
 * INITIAL STATE
 */
const initialState = {
  all: []
}

/**
 * ACTION CREATORS
 */
const gotAllOrders = orders => ({type: GOT_ALL_ORDERS, orders})

/**
 * THUNK CREATORS
 */
export const getAllOrders = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders')
      dispatch(gotAllOrders(data))
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
    case GOT_ALL_ORDERS:
      return {...state, all: action.orders}
    default:
      return state
  }
}
