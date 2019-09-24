import axios from 'axios'
import history from '../history'
import {stateChange} from '../components/navbar'
import {gotContents} from './cart'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  try {
    dispatch(getUser(res.data))
    const {data} = await axios.get('/api/orders/login')
    if (data.boards) {
      if (window.localStorage.length) {
        for (let i = 0; i < data.boards.length; i++) {
          let key = JSON.stringify({id: data.boards[i].id})
          let value = {
            name: data.boards[i].name,
            imageUrl: data.boards[i].imageUrl,
            quantity: data.boardOrder[i].quantity,
            price: data.boards[i].price * data.boardOrder[i].quantity,
            stock: data.boards[i].stock
          }
          if (window.localStorage.getItem(key)) {
            let tempPrice = JSON.parse(window.localStorage.getItem(key)).price
            let tempQuant = JSON.parse(window.localStorage.getItem(key))
              .quantity
            const newVal = JSON.stringify({
              ...value,
              price: value.price + tempPrice,
              quantity: value.quantity + tempQuant
            })
            window.localStorage.setItem(key, newVal)
          } else {
            window.localStorage.setItem(key, JSON.stringify(value))
          }
        }
      } else {
        for (let i = 0; i < data.boards.length; i++) {
          let key = JSON.stringify({id: data.boards[i].id})
          let value = JSON.stringify({
            name: data.boards[i].name,
            imageUrl: data.boards[i].imageUrl,
            quantity: data.boardOrder[i].quantity,
            price: data.boards[i].price * data.boardOrder[i].quantity,
            stock: data.boards[i].stock
          })
          window.localStorage.setItem(key, value)
        }
      }
      stateChange()
    }
    dispatch(gotContents())
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    dispatch(gotContents())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
