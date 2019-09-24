import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
const UserHome = props => {
  const {email, isLoggedIn} = props

  return isLoggedIn ? (
    <div className="welcome">
      <h1>Welcome back {email}!!</h1>
    </div>
  ) : (
    <div className="welcome">
      <h1>Welcome, user!</h1>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
