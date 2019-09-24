const myStorage = window.localStorage

export const retrieveStorage = () => {
  let arr = []
  for (const key in myStorage) {
    if (myStorage.hasOwnProperty(key)) {
      arr.push({
        id: JSON.parse(key).id,
        name: JSON.parse(myStorage[key]).name,
        imageUrl: JSON.parse(myStorage[key]).imageUrl,
        quantity: JSON.parse(myStorage[key]).quantity,
        price: JSON.parse(myStorage[key]).price
      })
    }
  }
  return arr
}
/**
 * ACTION TYPES
 */
const GOT_CART = 'GOT_CART'
const DELETE_CONTENT = 'DELETE_CONTENT'
const CHECKCARTOUT = 'CHECKOUT'

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
const deleteContent = id => ({type: DELETE_CONTENT, id})
const checkedCartOut = () => ({type: CHECKCARTOUT})

/**
 * THUNK CREATORS
 */
export const gotContents = () => {
  return dispatch => {
    try {
      dispatch(gotCart(retrieveStorage()))
    } catch (err) {
      console.log(err)
    }
  }
}
export const fetchDeletedcontent = id => dispatch => {
  try {
    myStorage.removeItem(`{"id":${id}}`)
    dispatch(deleteContent(id))
  } catch (err) {
    console.log(err)
  }
}
export const fetchCheckedCartOut = () => dispatch => {
  try {
    myStorage.clear()
    dispatch(checkedCartOut())
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_CART:
      return {...state, contents: action.contents}
    case DELETE_CONTENT:
      return {
        ...state,
        contents: state.contents.filter(
          content => `${content.id}` !== action.id
        )
      }
    case CHECKCARTOUT:
      return {
        contents: []
      }
    default:
      return state
  }
}
