import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ORDER_HISTORY = 'GOT_ORDER_HISTORY'
const CHECKOUT = 'CHECKOUT'

/**
 * INITIAL STATE
 */
const initialState = {
  history: [],
  checkout: {}
}

/**
 * ACTION CREATORS
 */
const gotOrderHistory = orders => ({type: GOT_ORDER_HISTORY, orders})
const gotCheckout = order => ({type: CHECKOUT, order})

/**
 * THUNK CREATORS
 */
export const getOrderHistory = () => {
  return async dispatch => {
    try {
      let {data} = await axios.get('/api/orders/history')
      let history = []
      for (let i = 0; i < data.length; i++) {
        let order = data[i]
        let boardOrders = await axios.get(`/api/orders/history/${order.id}`)
        boardOrders = boardOrders.data
        history.push({order, boardOrders})
      }
      dispatch(gotOrderHistory(history))
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
    case GOT_ORDER_HISTORY:
      return {...state, history: action.orders}
    case CHECKOUT:
      return {...state, checkout: action.order}
    default:
      return state
  }
}
