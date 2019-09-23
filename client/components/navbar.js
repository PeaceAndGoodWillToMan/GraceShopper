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
      <div id="navtitle">
        <nav className="navus">
          <h1 id="skatetitle">
            <img
              src="http://zeus.cooltext.com/images/f5b/f5b8d4ab42e21aa4fbc8b6251a9857b7b9f9b765.png"
              id="skatebar"
            />
          </h1>
          {isLoggedIn ? (
            <div className="links">
              <div className="link-list">
                {/* The navbar will show these links after you log in */}
                <Link to="/home">Home</Link>
                <Link to="/boards">Boards</Link>
                <Link to="/orders">Order History</Link>
              </div>
              <div className="logout">
                {window.localStorage.length ? (
                  <Link to="/cart">Cart&#40;{this.state.cart}&#41;</Link>
                ) : (
                  <Link to="/cart">Cart</Link>
                )}
                <a href="#" onClick={logoutHandleClick}>
                  Logout
                </a>
              </div>
            </div>
          ) : (
            <div className="links">
              <div className="link-list">
                {/* The navbar will show these links before you log in */}
                <Link to="/home">Home</Link>
                <Link to="/boards">Boards</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
              <div className="logout">
                {window.localStorage.length ? (
                  <Link to="/cart">
                    Cart&#40;{window.localStorage.length}&#41;
                  </Link>
                ) : (
                  <Link to="/cart">Cart</Link>
                )}
                <Link to="/login">Login</Link>
              </div>
            </div>
          )}
        </nav>
        <hr />
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
        console.log(window.localStorage)
        const data = await axios.post('/api/orders/logout', payload)
        window.localStorage.clear()
        console.log(data)
      } catch (err) {
        console.log('Error with axios.post /api/orders/logout')
      }
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
