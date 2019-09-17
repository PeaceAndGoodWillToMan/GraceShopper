import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Switch, Route} from 'react-router-dom'
import {logout} from '../store'
import {Login, Signup} from './auth-form'
import UserHome from './user-home'
import BoardList from './board-list'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>SkateWithUs</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/boards">Boards</Link>
          <Link to="/orders">Order History</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/home">Home</Link>
          <Link to="/boards">Boards</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
    <Route exact path="/home" component={UserHome} />
    <Route exact path="/boards" component={BoardList} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
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
    handleClick() {
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
