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
  all: []
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
      console.log('Something went wrong!')
    }
  }
}
export const fetchedCheckout = order => {
  return async dispatch => {
    try {
      const {data: checkout} = await axios.post('/api/orders/checkout', order)
      dispatch(gotCheckout(checkout))
    } catch (error) {
      console.log(error)
      console.log('MY ORDER', order)
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
      return {...state, all: [...state.all, action.order]}
    default:
      return state
  }
}
