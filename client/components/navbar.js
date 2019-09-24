import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import axios from 'axios'

export let stateChange = function() {
  this.setState({cart: window.localStorage.length})
}

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {cart: window.localStorage.length}
    stateChange = stateChange.bind(this)
  }
  render() {
    const {logoutHandleClick, isLoggedIn} = this.props
    return (
      <div>
        <nav>
          {isLoggedIn ? (
            <div>
              <div>
                <div className="allinks">
                  <img
                    src="http://zeus.cooltext.com/images/f5b/f5b8d4ab42e21aa4fbc8b6251a9857b7b9f9b765.png"
                    className="logo"
                  />
                  {/* The navbar will show these links after you log in */}
                  <Link to="/home">
                    <img src="https://images.cooltext.com/5329802.png" />
                  </Link>
                  <Link to="/boards">
                    <img src="https://images.cooltext.com/5329805.png" />
                  </Link>
                  <Link to="/orders">
                    <img src="https://images.cooltext.com/5329807.png" />
                  </Link>
                  {window.localStorage.length ? (
                    <Link to="/cart">
                      <img
                        src="https://purepng.com/public/uploads/large/purepng.com-shopping-cartshoppingcarttrolleycarriagebuggysupermarkets-1421526532331jylag.png"
                        className="cartpic"
                      />&#40;{this.state.cart}&#41;
                    </Link>
                  ) : (
                    <Link to="/cart">
                      <img
                        src="https://purepng.com/public/uploads/large/purepng.com-shopping-cartshoppingcarttrolleycarriagebuggysupermarkets-1421526532331jylag.png"
                        className="cartpic"
                      />
                    </Link>
                  )}
                  <a href="#" onClick={logoutHandleClick}>
                    <img src="https://images.cooltext.com/5329809.png" />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <div className="allinks">
                  <img
                    src="http://zeus.cooltext.com/images/f5b/f5b8d4ab42e21aa4fbc8b6251a9857b7b9f9b765.png"
                    className="logo"
                  />

                  {/* The navbar will show these links before you log in */}
                  <Link to="/home">
                    <img src="https://images.cooltext.com/5329802.png" />
                  </Link>
                  <Link to="/boards">
                    <img src="https://images.cooltext.com/5329805.png" />
                  </Link>
                  <Link to="/signup">
                    <img src="https://images.cooltext.com/5329806.png" />
                  </Link>
                  {window.localStorage.length ? (
                    <Link to="/cart">
                      <img
                        src="https://purepng.com/public/uploads/large/purepng.com-shopping-cartshoppingcarttrolleycarriagebuggysupermarkets-1421526532331jylag.png"
                        className="cartpic"
                      />&#40;{window.localStorage.length}&#41;
                    </Link>
                  ) : (
                    <Link to="/cart">
                      <img
                        src="https://purepng.com/public/uploads/large/purepng.com-shopping-cartshoppingcarttrolleycarriagebuggysupermarkets-1421526532331jylag.png"
                        className="cartpic"
                      />
                    </Link>
                  )}
                  <Link to="/login">
                    <img src="https://images.cooltext.com/5329827.png" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    )
  }
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    async logoutHandleClick() {
      if (window.localStorage.length) {
        let payload = {}
        for (let key in window.localStorage) {
          if (key[0] === '{') {
            let valParse = JSON.parse(window.localStorage.getItem(key))
            let idKey = JSON.parse(key).id
            let temp = {[idKey]: valParse}
            payload = {...payload, ...temp}
          }
        }
        try {
          await axios.post('/api/cart/logout', payload)
        } catch (err) {
          console.log('Error with axios.post /api/cart/logout')
        }
      }
      window.localStorage.clear()
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  logoutHandleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
