import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import axios from 'axios'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div id="navtitle">
    <nav className="navus">
      <h1 id="skatetitle">SkateWithUs</h1>
      {isLoggedIn ? (
        <div className="links">
          <div className="link-list">
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/boards">Boards</Link>
            <Link to="/orders">Order History</Link>
          </div>
          <div className="logout">
            <Link to="/cart">Cart</Link>
            <a href="#" onClick={handleClick}>
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
            <Link to="/cart">Cart</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

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
    async handleClick() {
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
        const data = await axios.post('/api/orders/logout', payload)
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
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
