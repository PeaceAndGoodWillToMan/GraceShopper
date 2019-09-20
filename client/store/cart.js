const myStorage = window.localStorage

/**
 * ACTION TYPES
 */
const GOT_CART = 'GOT_CART'
const DELETE_CONTENT = 'DELETE_CONTENT'

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
            name: JSON.parse(myStorage[key]).name,
            imageUrl: JSON.parse(myStorage[key]).imageUrl,
            quantity: JSON.parse(myStorage[key]).quantity,
            price: JSON.parse(myStorage[key]).price
          })
        }
      }
      dispatch(gotCart(arr))
    } catch (err) {
      console.log('Something went wrong!')
    }
  }
}
export const fetchDeletedcontent = id => dispatch => {
  try {
    dispatch(deleteContent(id))
  } catch (error) {
    console.log('Something went wrong!')
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
    default:
      return state
  }
}
