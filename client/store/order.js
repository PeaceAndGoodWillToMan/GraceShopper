import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ALL_ORDERS = 'GOT_ALL_ORDERS'
const CHECKOUT = 'CHECKOUT'

/**
 * INITIAL STATE
 */
const initialState = {
  all: [],
  checkout: {}
}

/**
 * ACTION CREATORS
 */
const gotAllOrders = orders => ({type: GOT_ALL_ORDERS, orders})
const gotCheckout = order => ({type: CHECKOUT, order})

/**
 * THUNK CREATORS
 */
export const getAllOrders = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders')
      dispatch(gotAllOrders(data))
    } catch (err) {
      console.log(err)
    }
  }
}
export const fetchedCheckout = order => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/cart/checkout', order)
      dispatch(gotCheckout(data))
    } catch (err) {
      console.log(err)
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
    case CHECKOUT:
      return {...state, checkout: action.order}
    default:
      return state
  }
}
