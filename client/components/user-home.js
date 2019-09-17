import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
const UserHome = props => {
  const {email, isLoggedIn} = props

  return isLoggedIn ? (
    <div>
      <h3>Welcome, {email}</h3>
      {/* insert board all */}
    </div>
  ) : (
    <div>
      <h3>Welcome, guest!</h3>
      {/* insert board all */}
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
