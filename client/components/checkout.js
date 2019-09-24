import React, {Component} from 'react'
import {connect} from 'react-redux'

class CheckoutComponent extends Component {
  componentDidMount() {
    let toast = document.getElementById('checkout-toast')
    toast.className = 'show'
    setTimeout(function() {
      toast.className = toast.className.replace('show', '')
    }, 3000)
  }
  render() {
    const orderNum = this.props.checkout[0].orderId
    return this.props.checkout ? (
      <div>
        <p>Your order id is: {orderNum}</p>
        <p>Your order has been received! print this page for your records</p>
        <div id="checkout-toast">Thank you for your purchase!</div>
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
