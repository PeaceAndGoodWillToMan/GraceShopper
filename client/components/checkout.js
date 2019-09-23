import React, {Component} from 'react'
import {connect} from 'react-redux'

class CheckoutComponent extends Component {
  render() {
    const orderNum = this.props.checkout.boardOrder[0].orderId
    return this.props.checkout ? (
      <div>
        <h4>Your order id is: {orderNum}</h4>
        <p>Your order has been received! print this page for your records</p>
      </div>
    ) : (
      <div>
        <p>Loading. . .</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  checkout: state.order.checkout
})

const Checkout = connect(mapStateToProps)(CheckoutComponent)
export default Checkout
