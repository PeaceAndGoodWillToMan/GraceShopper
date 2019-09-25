import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, Cart} from './components'
import Profile from './components/profile'
import BoardList from './components/board-list'
import {me} from './store'
import SingleBoard from './components/board-single'
import CartContents from './components/cart/cart'
import Checkout from './components/checkout'
import orderHistoryList from './components/order/order-history-list'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={UserHome} />
        <Route exact path="/home" component={UserHome} />
        <Route exact path="/boards" component={BoardList} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/boards/:id" component={SingleBoard} />
        <Route exact path="/cart" component={CartContents} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/orderHistory" component={orderHistoryList} />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
//     // Otherwise, state.user will be an empty object, and state.user.id will be falsey
//     isLoggedIn: !!state.user.id
//   }
// }

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(null, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired
}
